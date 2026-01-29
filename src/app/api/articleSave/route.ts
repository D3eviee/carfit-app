import prisma from "@/lib/db";
import { uploadPostImageToGallery } from "@/lib/s3";
import { NextResponse } from "next/server";

function setCorsHeaders(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*'); 
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization,');
  return res;
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}));
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.EDITOR_SECRET_KEY}`) {
      return setCorsHeaders(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const layout = formData.get('layout') as string;
    const mainImage = formData.get('image') as File | null;
    
    let postImageKey:string;

    if (mainImage) {
        const imageKey = await uploadPostImageToGallery({ file: mainImage, title: title });
        postImageKey = `https://carfitapp.s3.eu-north-1.amazonaws.com${imageKey.key}`
    }

    const contentRaw = formData.get('content') as string;
    const contentJson = JSON.parse(contentRaw);

    const processedContent = await Promise.all(contentJson.map(async (block: any) => {
      if (block.type === "image") {
            const fileKey = `image-${block.id}`;
            const blockFile = formData.get(fileKey) as File | null;

            if (blockFile) {
                const s3Data = await uploadPostImageToGallery({ 
                    file: blockFile, 
                    title: title 
                });

                return {
                    ...block,
                    data: {
                        imageUrl: `https://carfitapp.s3.eu-north-1.amazonaws.com${s3Data.key}` ,
                        alt: block.data.alt
                    }
                };
            }
        }

        return block;
    }));

    await prisma.article.create({
      data: { 
        title: title,
        image: postImageKey,
        layout: layout,
        content: processedContent,
        status: "public",
      },
    });

    const response = NextResponse.json({ success: true });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("API Error:", error);
    const response = NextResponse.json({ error: "Server Error" }, { status: 500 });
    return setCorsHeaders(response);
  }
}
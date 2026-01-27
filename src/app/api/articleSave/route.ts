// app/api/editor/save/route.ts
import prisma from "@/lib/db";
import { uploadPostImageToGallery } from "@/lib/s3";
import { NextResponse } from "next/server";

// Helper do CORS (żeby edytor działał lokalnie)
function setCorsHeaders(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*'); 
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}));
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  // 1. Walidacja BEZPIECZEŃSTWA (Kluczowe!)
  if (authHeader !== `Bearer ${process.env.EDITOR_SECRET_KEY}`) {
      return setCorsHeaders(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const layout = formData.get('layout') as string;
    const mainImage = formData.get('mainImage') as File | null;
    
    let postImageKey = "";
    if (mainImage) {
        const uploaded = await uploadPostImageToGallery({ file: mainImage, title: title });
        postImageKey = uploaded.key; // Zakładam, że zwracasz obiekt z kluczem/url
    }

    const contentRaw = formData.get('content') as string;
    const contentJson = JSON.parse(contentRaw);

    const processedContent = await Promise.all(contentJson.map(async (block: any) => {
        
        if (block.type === "image") {
            const fileKey = `block_image_${block.id}`;
            const blockFile = formData.get(fileKey) as File | null;

            if (blockFile) {
                const s3Data = await uploadPostImageToGallery({ 
                    file: blockFile, 
                    title: `${title}-${block.id}` 
                });

                return {
                    ...block,
                    data: {
                        imageUrl: s3Data.key,
                        alt: block.data.alt
                    }
                };
            }
        }
        
        // Jeśli to nie obrazek lub nie ma pliku, zwracamy blok bez zmian
        return block;
    }));

    // 3. Zapis do bazy PRISMA (z przetworzonym contentem!)
    await prisma.article.create({
      data: { 
        title: title,
        image: postImageKey, // Klucz S3 głównego zdjęcia
        layout: layout,
        content: processedContent, // Tutaj trafia JSON z gotowymi linkami S3
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
'use server'

import prisma from "@/lib/db"

export const getBlogPosts = async () => {
    try {
        const blogPosts = await prisma.article.findMany({
            select: {
              id:true,
              image: true,
              layout:true,
              title:true,
              content: true,
              createdAt:true,
            }
        })

         return {success: true, data: blogPosts}
    }catch(error){
        return {success: false, message: "Server error occured while getting data: " + error}
    }
}
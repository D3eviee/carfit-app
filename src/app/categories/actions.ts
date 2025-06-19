'use server'
import prisma from "@/lib/db"

// function for requesting search results 
export const getCategoryBusinesses = async (category:string) =>{

    const categoryToUppercase = category[0].toUpperCase() + category.slice(1)

    try {
        const searchResult = prisma.business.findMany({
            where:{
                category: categoryToUppercase
            },
            select:{
                id: true,
                name: true,
                image: true,
                category: true,
                town: true,
                district: true,
                street: true,
                zipcode: true,  
                reviews:{
                    select: {
                        rate: true
                    },
                }
            }
        })

        if(!searchResult) return {success: false, message: "There was a problem with getting results"}
        return {success: true, data: searchResult}
    } catch (error) {
         return {success: false, message: "There was a server problem while getting data: " + error}
    }
}
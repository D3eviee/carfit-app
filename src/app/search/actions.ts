'use server'
import prisma from "@/lib/db"

// function for requesting search results 
export const getSearchedBusinesses = async (town:string) =>{
    try {
        const searchedBusinesses = prisma.business.findMany({
            where:{
                town: town
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
        return searchedBusinesses
    } catch (error) {
        return {error}
    }
}
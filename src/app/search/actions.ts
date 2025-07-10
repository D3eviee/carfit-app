'use server'
import prisma from "@/lib/db"

// function for requesting search results 
export const getSearchedBusinesses= async () =>{
    try {
        const searchResult = prisma.business.findMany({
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

// function for requesting search results 
export const getSearchedBusinessesByLocation = async (town:string) =>{
    try {
        const searchResult = prisma.business.findMany({
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

        if(!searchResult) return {success: false, message: "There was a problem with getting results"}
        return {success: true, data: searchResult}
    } catch (error) {
         return {success: false, message: "There was a server problem while getting data: " + error}
    }
}

// function for requesting search results 
export const getSearchedBusinessesByType = async (type:string) =>{
    try {
        const searchResult = prisma.business.findMany({
            where:{
                category: type
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

// function for requesting search results 
export const getSearchedBusinessesByTypeAndCategory = async (town:string, type: string) =>{
    try {
        const searchResult = prisma.business.findMany({
            where:{
                town: town,
                category: type,
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
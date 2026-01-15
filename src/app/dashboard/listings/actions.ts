'use server'
import { businessAuth } from "@/lib/auth"
import prisma from "@/lib/db"

export const isBusinessPublic = async ()=> {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się."}

        const response = await prisma.business.findUnique({
            where: {id: business.id},
            select: { isPublic: true }
        })

        return {status: true, data: response}
    }catch(error){
        console.log(error)
        return {success: false, message: "Wystąpił problem z serwerem, proszę spróbuj później"}
    }
}

export const getAllOffering = async ()=> {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "No-authenticated user"}

        const rawOfferings = await prisma.announcement.findMany({
            where: {
                status: "open",
            },
            select:{
                id: true,
                status: true,
                title: true,
                description: true,
                createdAt: true, 
                category: true, 
                town: true,
                district: true,
                car: {
                    select:{
                        brand: true,
                        model: true,
                    }
                },
                client: {
                    select: {
                        phone: true,
                        name: true
                    }
                },
                offers: {
                    where: {
                        businessId: business.id
                    },
                    select: {
                        id: true,
                        description: true,
                    },
                    take: 1
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

         const offerings = rawOfferings.map((a) => ({
            id: a.id,
            status: a.status,
            title: a.title,
            description: a.description,
            createdAt: a.createdAt,
            category: a.category,
            brand: a.car?.brand ?? null,
            model: a.car?.model ?? null,
            town: a.town,
            district: a.district,
            clientName: a.client.name,
            clientPhone: a.client.phone,
            offerId: a.offers[0]?.id ?? null,
            offerDescription: a.offers[0]?.description ?? null,
        }))

        if(rawOfferings.length === 0) return {success: false, message: "There was a problem with getting your data"}
        return {success: true, data: offerings}
    }catch(error){
        return {success: false, message: "Wystąpił problem z serwerem, proszę spróbuj później" + error}
    }
}

export const addServiceOffer = async (announcementId, offer) => {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "No-authenticated user"}

        const newOfferResponse = await prisma.offer.create({
            data:{
                businessId: business.id,
                description: offer,
                announcementId: announcementId,
            }
        })
      
        if(!newOfferResponse) return {success: false, message: "There was a problem with getting your data"}
        return {success: true, data: newOfferResponse}
    }catch(error){
        return {success: false, message: "Wystąpił problem z serwerem, proszę spróbuj później" + error}
    }

}

export const updateServiceOffer = async (offerId: string, offerDescription: string) => {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "Odmowa dostępu. Użytkownik niezalogowany"}

        const newOfferResponse = await prisma.offer.update({
            where: { id: offerId },
            data:{ description: offerDescription }
        })
      
        if(!newOfferResponse) return {success: false, message: "There was a problem with updating your data"}
        return {success: true, data: newOfferResponse}
    }catch(error){
        return {success: false, message: "Wystąpił problem z serwerem, proszę spróbuj później" + error}
    }

}

// LISTINGS -> DELETES SERVICE OFFER
export const deleteServiceOffer = async (offerId) => {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const deleteResult = await prisma.offer.delete({ 
            where: { id: offerId }
        })
        if(!deleteResult) return {success: false, message:`Wystąpił problem podczas usuwania oferty`}
        return { success: true, message:`Oferta została usunięta`}
    }catch(error){
        return {success: false, message: `Wystąpił problem podczas usuwania oferty ${error}`}
    }
}
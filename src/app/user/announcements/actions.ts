'use server'
import { userAuth } from "@/lib/auth";
import prisma from "@/lib/db"

// PROFILE/ANNOUNCEMENTS -> getting cars for modal
export const getClientCars = async () => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "Brak autoryzacji. Zaloguj się."}
        
        const clientCars = await prisma.car.findMany({
            where: { 
                clientId: user.id,
                archived: false,
            },
            select: {
                id: true,
                brand: true,
                model: true, 
                year: true,
            },
        })
        return {success: true, data: clientCars}
    }catch(error){
        return {success: false, message: "Server error occured while getting data: " + error}
    }
}

// PROFILE/ANNOUNCEMENTS -> adding new Announcement 
export const addNewAnnouncement = async ({title, category, description, carId, town, district }) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "Brak autoryzacji. Zaloguj się."}
        
        const addNewAnnouncmentResult = await prisma.announcement.create({
            data: {
                title: title,
                description: description,
                category : category,
                district: district,
                town: town,
                carId: carId,
                clientId: user.id,
            },
        })
        return {success: true, data: addNewAnnouncmentResult}
    }catch(error){
        console.log(error)
        return {success: false, message: "Podczas dodwawania ogłoszenia wystąpił błąd"}
    }
}

// PROFILE/ANNOUNCEMENTS -> gets all announcements for client profile
export const getClientAnnouncements = async () => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "Brak autoryzacji. Zaloguj się."}
        
        const rawClientAnnouncments = await prisma.announcement.findMany({
            where: { 
                clientId: user.id,
            },
            select:{
                id: true,
                status: true,
                title: true,
                description: true,
                createdAt: true, 
                category: true, 
                car: {
                    select:{
                        brand: true,
                        model: true,
                    }
                },
                _count:{
                    select: {
                        offers : true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const clientAnnouncments = rawClientAnnouncments.map((a) => ({
            id: a.id,
            status: a.status,
            title: a.title,
            description: a.description,
            createdAt: a.createdAt,
            category: a.category,
            brand: a.car?.brand ?? null,
            model: a.car?.model ?? null,
            offersCount: a._count.offers,
        }))

        return {success: true, data: clientAnnouncments}
    }catch(error){
        console.error(error)
        return {success: false, message: "Podczas pobierania danych wystąpił błąd"}
    }
}


export const getClientAnnouncement = async (id:string) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "Brak autoryzacji. Zaloguj się."}
        
        const rawAnnouncement = await prisma.announcement.findMany({
            where: { 
                id: id,
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
                        year: true,
                    }
                },
                client: {
                    select:{
                        name: true,
                        phone: true,
                        email: true,
                        image: true,
                    }
                },
                offers: {
                    select: {
                        description: true,
                        business: {
                            select: {
                                id:true,
                                image: true,
                                name: true,
                                town: true, 
                                district: true,
                                zipcode: true,
                                street: true,
                            }
                        }
                    }
                }
            }
        })

        const announcement = {
            announcementData:{
                id: rawAnnouncement[0].id,
                status: rawAnnouncement[0].status,
                title: rawAnnouncement[0].title,
                description: rawAnnouncement[0].description,
                createdAt: rawAnnouncement[0].createdAt,
                category: rawAnnouncement[0].category,
                brand: rawAnnouncement[0].car.brand,
                model: rawAnnouncement[0].car.model,
                year: rawAnnouncement[0].car.year,
                town: rawAnnouncement[0].town,
                district: rawAnnouncement[0].district
            },
            client: {
                name: rawAnnouncement[0].client.name,
                phone: rawAnnouncement[0].client.phone,
                email: rawAnnouncement[0].client.email,
                image: rawAnnouncement[0].client.image
            },
            announcementOffers: rawAnnouncement[0].offers.map((o) => ({
                description: o.description,
                id: o.business.id,
                image: o.business.image,
                name: o.business.name,
                town: o.business.town,
                district: o.business.district,
                zipcode: o.business.zipcode,
                street: o.business.street,
            })),
        }

        return {success: true, data: announcement}
    }catch(error){
        return {success: false, message: "Server error occured while getting data: " + error}
    }
}

// THIS FUNCTION CANCELS ANNOUNCEMENT
export const cancelAnnouncement = async (announcementId:string) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const result = await prisma.announcement.update({ 
            where: {  id: announcementId,},
            data: { status: "canceled", }
        })
        if(!result) return {success: false, message:`Wystąpił problem zamykania ogłoszenia`}
        return { success: true, message:`Ogłoszenie zamknięte`}
    }catch(error){
        return {success: false, message: `Wystąpił problem zamykania ogłoszenia ${error}`}
    }
}

// THIS FUNCTION CLOSES ANNOUNCEMENT
export const closeAnnouncement = async (announcementId:string) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const result = await prisma.announcement.update({ 
            where: {  id: announcementId,},
            data: { status: "closed", }
        })
        if(!result) return {success: false, message:`Wystąpił problem zamykania ogłoszenia`}
        return { success: true, message:`Ogłoszenie zamknięte`}
    }catch(error){
        return {success: false, message: `Wystąpił problem zamykania ogłoszenia ${error}`}
    }
}
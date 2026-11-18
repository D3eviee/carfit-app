'use server'
import prisma from "@/lib/db";
import { businessAuth } from "@/lib/auth";

// getting data for sidebar navigation profile view
export const getSideNavigationProfileData = async () => {
    const auth = await businessAuth()

    if(!auth.success) return {success: false, message: "Non-auth user. Please log-in."}

    try{
        const businessProfileData = await prisma.business.findUnique({
            where: { id: auth.id },
            select: {
                id: true,
                createdAt: true,  
                name: true, 
                phone: true, 
                email: true,
                image: true,
                owner: true,
            }
        })

        if (!businessProfileData) return {success: false, message:"We coudn't get data for this profile"}

        return { success: true, data: businessProfileData}

    }catch{
       return {success: false, message: "There was a problem with getting your data"}
    }
}

// creates link to service gallery photo and puts it into database
export const putBusinessImageToGallery = async (serviceId:string, imageKey:string) => {
    const s3Link = `https://carfitapp.s3.eu-north-1.amazonaws.com/${imageKey}`

    const putImage  = await prisma.image.create({
        data: {
            businessId: serviceId,
            photoUrl: s3Link
        }
    })
    
    return putImage
}

// getting working hours for business
export const getWorkingTimeData = async () => {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "No-authenticated. Log-in"}

        const workingTimeData = await prisma.workingDay.findMany({
            where: {
                serviceId: business.id
            },
            orderBy: {
                dayOfWeek: "asc"
            }
        })

        return { success: true, data: workingTimeData}
    }
    catch (error) {
        return {success: false, message: "Error while trying to retreieve working time data: " + error}
    }
}

// getting working hours for business
export const getWorkingTimeDataForNewAppointmet = async () => {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "No-authenticated. Log-in"}

        const workingTimeData = await prisma.workingDay.findMany({
            where: { serviceId: business.id },
            select:{
                isOpen : true,
                dayOfWeek: true,
                open: true,
                close: true
            }
        })

        return { success: true, data: workingTimeData}
    }
    catch (error) {
        return {success: false, message: "Error while trying to retreieve working time data: " + error}
    }
}
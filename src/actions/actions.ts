'use server'
import prisma from "@/lib/db";
import { authRole, businessAuth } from "@/lib/auth";

// NAVBARS
// returning data for navbar profile menu, depending on the type of logged user
export const getNavbarUserData = async () => {
    const auth = await authRole()
    if(auth.role == "NONAUTHORIZED") return  {role: "NONAUTHORIZED"}

    if(auth.role === "CLIENT"){        
        const userData = await prisma.client.findUnique({
            where: {
                id: auth.id
            },
            select: {
                name: true,
                phone: true,
                image: true
            }
        })

        if (!userData) return

        return {
            ...userData,
            role: auth.role
        }
    }

    if(auth.role === "BUSINESS"){        
        const businessData = await prisma.business.findUnique({
            where: {
                id: auth.id
            },
            select: {
                name: true,
                phone: true,
                image: true,
            }
        })

        if (!businessData) return

        return { ...businessData, role: auth.role}
    }
}

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


// SERVICE PAGE
// returning data for service page
export const getBusinessData = async (id: string) => {
    try {
        const serviceData = await prisma.business.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                phone: true,
                category: true,
                description: true,
                town: true,
                zipcode: true,
                district: true,
                street: true,
                images: true,
                reviews: {
                    select: {
                        id: true,
                        rate: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        client: {
                            select: { name: true }
                        }
                    },
                    orderBy: { createdAt: "desc"}
                },
                workingDays: {
                    select: {
                        open: true,
                        close: true,
                        dayOfWeek: true,
                        isOpen: true,
                    },
                    orderBy: {
                        dayOfWeek: "asc"
                    }
                },
                categories: {
                    select: {
                        id: true,
                        name: true,
                        services: {
                            select: {
                                id: true,
                                categoryId: true,
                                name: true,
                                description: true,
                                duration: true,
                                price: true,
                            }
                        }
                    }
                }
            }
        })

        if(!serviceData){
            return {
                success: false,
                error: "There was a problem with getting service data"
            }
        }

        return {
            success: true,
            data: serviceData
        }
    }
    catch (error) {
        return {
            success: false,
            error: error
        }
    }
}

//IMAGES
// creates link to user profile photo and puts it into database
export const putProfileImageToDatabase = async (userId:string, imageKey:string) => {
    const s3Link = `https://carfitapp.s3.eu-north-1.amazonaws.com/${imageKey}`

    const putImage  = await prisma.client.update({
        where: { id: userId},
        data: { image: s3Link }
    })
    
    return putImage
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
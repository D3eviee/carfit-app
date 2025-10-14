'use server'
import prisma from "@/lib/db";
import { businessAuth } from "@/lib/auth";

// getting basic profile data like name, phone, image etc.
// used in sidebar and profile page
export const getBusinessProfile = async () => {
    const auth = await businessAuth()
    if(!auth.success) return {success: false, message: "Non-auth user. Please log-in."}

    try{
        const businessProfileData = await prisma.business.findUnique({
            where: { id: auth.id },
            select: {
                createdAt: true,  
                name: true, 
                email: true,
                image: true,
                owner: true,
                phone: true
            }
        })

        if (!businessProfileData) return {success: false, message:"We coudn't get data for this profile"}
        return { success: true, data: businessProfileData}
    }catch{
       return {success: false, message: "There was a problem with getting your data"}
    }
}
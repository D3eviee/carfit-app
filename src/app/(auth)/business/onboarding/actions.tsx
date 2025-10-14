'use server'
import { createBusinessSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { businessOnboardingEmailSchema } from "@/lib/schema";
import { BusinessOnboardingStore } from "@/lib/store";
import { WorkingDay } from "@/lib/types";
import prisma from "@/lib/db";

export const isBusinessEmailAvailable = async (email: string) => {
    try {
        
        const existingBusinessEmail = await prisma.business.findUnique({where: { email }})
        if (existingBusinessEmail) return { isAvailable: false, message: "Konto z tym adresem eamil już istnieje" }
        return { isAvailable: true}
    } catch{
        return { isAvailable: false, message: "Wystąpił problem podczas rejestracji"}
    }
}

export const isBusinessPhoneAvailable = async (phone: string) => {
    try {
        const existingBusinessPhone = await prisma.business.findUnique({where: { phone: phone }})
        if (existingBusinessPhone) return { isAvailable: false, message: "Serwis z tym numerem telefonu już istnieje" }
        return { isAvailable: true}
    } catch{
        return { isAvailable: false, message: "Wystąpił problem podczas rejestracji"}
    }
}

export const createBusinessAccount = async (businessOnboardingData: BusinessOnboardingStore, workingDays: WorkingDay[]) => {
    const isDataValid = businessOnboardingEmailSchema.safeParse(businessOnboardingData)
    if(!isDataValid.success)  return {success: false, message: "Podane ane dane nie spełniają wymagań"}

    try{
        const { email, password, businessName, businessCategory, businessPhone, businessOwner, businessTown, businessZipcode, businessDistrict, businessStreet, businessDescription } = businessOnboardingData
        const securePassword = await bcrypt.hash(password, 10)

        
        //create new service and add to database
        const addNewBusiness = await prisma.business.create({
            data: {
                email: email,
                password: securePassword,
                name: businessName,
                category: businessCategory,
                phone: businessPhone,
                owner: businessOwner,
                town: businessTown,
                zipcode: businessZipcode,
                district: businessDistrict,
                description: businessDescription,
                street: businessStreet,
                facebookUrl: "",
                instagramUrl: "",
                websiteUrl: "",
            }
        })
        if(!addNewBusiness) return {success: false, message: "Wystąpił problem podczas tworzenia twojego konta"}

        //create new service and add to database
        const addWorkingHoursForBusiness = await Promise.all(
            workingDays.map((day: WorkingDay) =>
                prisma.workingDay.create({
                    data: {
                        dayOfWeek: day.dayOfWeek,
                        open: day.open,
                        close: day.close,
                        isOpen: day.isOpen,
                        serviceId: addNewBusiness.id
                    }
        })))
        if(!addWorkingHoursForBusiness) return {success: false, message: "Wystąpił problem podczas tworzenia twojego konta xd?"}

        //create sesssion
        const session = await createBusinessSession(addNewBusiness)

        if (!session.success) return {success: false, message: "Twoje konto zostało utworzone. Przejdź do strony logowania "}
        return {success: true, message: "Twoje konto zostało utworzone"}
    }catch(error){
        return {success: false, message: "Wystąpił problem serwera podczas tworzenia twojego konta " + error}
    }
}


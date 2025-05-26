'use server'
import prisma from "@/lib/db";
import { createBusinessSession } from "@/lib/session";
import { OnboardingState } from "@/lib/store";
import { WorkingDay } from "@/lib/types";
import bcrypt from "bcryptjs";

export const emailExists = async (email: string) => {
    try {
        // Check if user already exists
        const existingBusiness = await prisma.business.findUnique({
            where: { email },
        })


        if (existingBusiness) {
            return { available: false, message: "Account with this email already exists" }
        }

        return { available: true, message: "Email available" }
    } catch{
        return { available: false, message: "Error while processing email!"}
    }
}

export const createBusinessAccount = async (data: OnboardingState, workingDays: WorkingDay[]) => {
    const { 
        email, password, businessName, businessCategory, businessPhone, businessOwner, businessTown, businessZipcode, businessDistrict, businessStreet, businessDescription
    } = data

    const securePassword = await bcrypt.hash(password!, 10)

    try {
        //create new service and add to database
        const service = await prisma.business.create({
            data: {
                email: email!,
                password: securePassword,
                name: businessName!,
                category: businessCategory!,
                phone: businessPhone!,
                owner: businessOwner!,
                town: businessTown!,
                zipcode: businessZipcode!,
                district: businessDistrict!,
                description: businessDescription,
                street: businessStreet!,
            }
        })

        //create new service and add to database
        if (service) {
            await Promise.all(
                workingDays.map((day: WorkingDay) =>
                    prisma.workingDay.create({
                        data: {
                            dayOfWeek: day.dayOfWeek,
                            open: day.open,
                            close: day.close,
                            isOpen: day.isOpen,
                            serviceId: service.id
                        }
                    })
                ))
        }

        //create sesssion
        const session = await createBusinessSession(service)
        if (session.success) {
            return { success: true, status: 200 };
        }

        return { status: "success", message: "Creted user but no session" }
    } catch {
        return { status: "failed", message: "Creating user failed" }
    }
}
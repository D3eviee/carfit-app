'use server'
import { businessAuth } from "@/lib/auth"
import prisma from "@/lib/db"

export const getAppointmentsTableData = async ()=> {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "No-authenticated user"}

        const appointmentData = await prisma.reservation.findMany({
            where: { businessId: business.id},
            select: {
                client: {
                    select: { name: true, phone: true }
                },
            charge: true,
            reservationStart: true,
            status: true,
        }})

        if(!appointmentData) return {success: false, message: "Wystąpił problem podczas pobierania danych"}
        return {success: true, data: appointmentData}

    }catch(error){
        return {success: false, message: "Wystąpił problem z serwerem, proszę spróbuj później" + error}
    }
}
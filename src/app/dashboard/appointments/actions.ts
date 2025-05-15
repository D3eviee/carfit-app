'use server'
import { businessAuth } from "@/lib/auth"
import prisma from "@/lib/db"

export const getAppointmentsTableData = async ()=> {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "No-authenticated user"}

        const data = await prisma.reservation.findMany({
            where: { businessId: business.id},
            select: {
                client: {
                    select: {
                        name: true,
                        phone: true, 
                    }
                },
            charge: true,
            reservationStart: true,
            status: true,
            clientName: true,
            clientPhone: true
        }})

        
        const appointments = data.map((item) =>{
            if(!item.client) return {
                ...item,
                client: {
                    name: item.clientName,
                    phone: item.clientPhone
                },
            }
            else{
                return item
            }
        })



        return {success: true, data: appointments}

    }catch(error){
        return {success: false, message: "Server problem occured while getting appointments data" + error}
    }
}
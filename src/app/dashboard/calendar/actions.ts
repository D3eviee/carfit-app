'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db";

// getting appointments for calendar week view
export const getAppointmentsForWeekInterval = async (weekInterval: Date[]) => {
    try{
        const business = await businessAuth()
        if(business.success == false) return {success: false, message: "No-authenticated user. Log-in!"} 

        const weekReservations =  await prisma.reservation.findMany({
            where: {
                businessId: business.id,
                reservationStart: {
                    gte: weekInterval[0], // Start tygodnia
                    lte: weekInterval[weekInterval.length - 1], // Koniec tygodnia
                },
                status: "Zarezerwowana"
            },
            select: {
                id: true,
                clientName: true, 
                clientPhone: true,
                duration : true,
                reservationStart: true,
                charge: true,
                clientId:true,
                status: true,
                client:{
                    select: {
                        name:true,
                        phone: true,
                        image: true,
                        email: true,
                    }
                },
                services: {
                    select: {
                        service: {
                            select: {
                                name:true,
                                price: true,
                            }
                        }
                    }
                }
            }
        })

        const reservations = weekReservations.map((item) => {
            const servicesData = item.services.map((service) => ({name:service.service.name, price: service.service.price}))

            if(item.clientId == null){
                return {
                    appointmentId: item.id,
                    clientName: item.clientName,
                    clientPhone: item.clientPhone,
                    clientImage: "https://carfitapp.s3.eu-north-1.amazonaws.com/BusinessGallery/fe69e074-0cef-48af-880b-e08895d1d734/ecc30e22-1193-413e-96ec-d84222d95b88",
                    reservationStart: item.reservationStart,
                    duration : item.duration,
                    charge: item.charge,
                    status: item.status,
                    service: servicesData
                }
            }else{
                return {
                    appointmentId: item.id,
                    clientPhone: item.client.phone, 
                    clientName: item.client.name, 
                    clientImage: item.client.image,
                    reservationStart: item.reservationStart,
                    duration : item.duration,
                    charge: item.charge,
                    status: item.status,
                    service: servicesData
                }
            }
        })

        return {success: true, data: reservations}
    }catch(error){
        return {success: false, message: "Server error while getting week reservations" + error}
    }
};

export const cancelAppointment = async (appointmentId:string) => {
    try{
        const business = await businessAuth()
        if(business.success == false) return {success: false, message: "No-authenticated user. Log-in!"} 

        const deleteAppointment = await prisma.reservation.update({
            where: { id: appointmentId },
            data: { status: "Odwołana" }
        })

        if(!deleteAppointment) return {success: false, message: "Erorr occured while canceling reservations"}

        return {success: true, data: deleteAppointment}
    }catch(error){
        return {success: false, message: "Unexpected error occured while trying to delete appointment:" + error}
    }
}
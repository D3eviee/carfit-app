'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db";

// getting appointments for calendar week view
export const getAppointmentsForWeekInterval = async (weekInterval: Date[]) => {
    try{
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "No-authenticated user. Log-in!"} 

        const weekReservations =  await prisma.reservation.findMany({
            where: {
                businessId: business.id,
                reservationStart: {
                    gte: weekInterval[0], // Start tygodnia
                    lte: weekInterval[weekInterval.length - 1], // Koniec tygodnia
                }
            },
            select: {
                clientPhone: true, 
                clientName: true,
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

        const reservation = weekReservations.map((item) => {
            const servicesData = item.services.map((service) => ({name:service.service.name, price: service.service.price}))

            if(!item.client) return {
                status: item.status,
                clientPhone: item.clientPhone, 
                clientEmail: "hipolitroszkowski@protonmail.ch",
                clientName: item.clientName, 
                clientImage: null,
                duration : item.duration,
                reservationStart: item.reservationStart,
                charge: item.charge,
                service: servicesData
            }
            else return {
                status: item.status,
                clientPhone: item.client.phone, 
                clientEmail: item.client.email,
                clientName: item.client.name, 
                clientImage: item.client.image,
                duration : item.duration,
                reservationStart: item.reservationStart,
                charge: item.charge,
                service: servicesData
            }
        })

        return {success: true, data: reservation}
    }catch(error){
        return {success: false, message: "Server error while getting week reservations" + error}
    }
};
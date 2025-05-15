'use server'
import { userAuth } from "@/lib/auth"
import prisma from "@/lib/db"
import { NewReservation } from "@/lib/types"

//getting reservation for selected booking day
export const getActiveMonthAppointments = async(activeDate:Date, businessId:string) => {
    const activeDateYear = activeDate.getFullYear()
    const activeDateMonth = activeDate.getMonth()+1

    try{
        const reservationForDay = await prisma.reservation.findMany({
            where: {
                businessId: businessId,
                reservationYear:activeDateYear,
                reservationMonth: activeDateMonth,
            },
           select: {
            reservationStart: true,
            reservationEnd: true,
            duration: true
           },
        })

        if(!reservationForDay) return {success: false, error: "There was no reservations"}
        return  {success: true, data: reservationForDay }
    }catch{
       return {success: false, error: "There was a problem with getting today's reservations"}
    }
}

// function for getting recomeneded services on landing page
export const getRecommendedServices = async () => {
    try {
        const recomenededServices = await prisma.business.findMany({
            select:{
                id: true,
                name: true,
                image: true,
                category: true,
                town: true,
                district: true,
                street: true,  
                reviews:{
                    select: {
                        rate: true
                    },
                }
            },
            take: 5,
        })

        if(!recomenededServices){
            return {
                success: false,
                message: "No recommended services to show."
            }
        }

        return {
            success: true,
            data: recomenededServices
        }
    }catch (error) {
        return {
            success: false,
            message: `There was a problem with your data: ${error}`
        }   
    }
}

// function for getting categories and services for booking page
export const getBusinessCategoriesAndServices = async (id:string) => {
    try{
        const categoriesData = await prisma.categories.findMany({
            where: {
                serviceId: id
            },
            select: {
                id: true,
                name: true,
                services: true
            }
        })

        if(!categoriesData) return {status: false, message: "No data..."}
        return { status: true, data: categoriesData }
    }catch(err){
        return {status: false, message: err}
    }
}

// adding new reservation to database
export const addReservation = async (reservation:NewReservation) => {
    const client = await userAuth()

    try{
        if(!client.success){
            const newReservation = await prisma.reservation.create({
                data: {
                    businessId: reservation.businessId,
                    reservationYear: reservation.reservationYear,
                    reservationMonth: reservation.reservationMonth + 1,
                    reservationStart: reservation.reservationStart,
                    reservationEnd:reservation.reservationEnd,
                    duration: reservation.duration,
                    charge: reservation.charge,
                    status: reservation.status,
                    clientName: reservation.clientName,
                    clientPhone: reservation.clientPhone
                }
            })
          
            await Promise.all(
                reservation.servicesIds.map((serviceId) =>
                    prisma.reservationServices.create({
                        data: {
                            reservationId: newReservation.id,
                            serviceId: serviceId
                        }
                    })
                )
            )
        }else{
            const newReservation = await prisma.reservation.create({
                data: {
                    businessId: reservation.businessId,
                    clientId: client.id, 
                    reservationYear: reservation.reservationYear,
                    reservationMonth: reservation.reservationMonth + 1,
                    reservationStart: reservation.reservationStart,
                    reservationEnd:reservation.reservationEnd,
                    duration: reservation.duration,
                    charge: reservation.charge,
                    status: reservation.status,
                    clientName: reservation.clientName,
                    clientPhone: reservation.clientPhone
                }
            })

            const services = await Promise.all(
                reservation.servicesIds.map((serviceId) =>
                    prisma.reservationServices.create({
                        data: {
                            reservationId: newReservation.id,
                            serviceId: serviceId
                        }
                    })
                )
            )
            
            if(services && newReservation) return {success: true}
            return {success: false, error: "There was a problem with your reservation!"}
        }

    }catch{
        return {status: false, error: "There was server problem while adding your reservation"}
    }
}

export const getBusinessWorkingHours = async (businessId: string) => {
    try {
        const workingHoursData = await prisma.workingDay.findMany({
            where: {
                serviceId:businessId
            },
            select:{
                dayOfWeek: true,
                isOpen: true,
                open: true,
                close: true
            },
            orderBy: {
                dayOfWeek: "asc"
            }
        })

        if(!workingHoursData) return {success: false, error: "No working time data!"}
        return {success: true, data: workingHoursData}
    }
    catch{
       return {success: false, error: "There was a problem while getting your data"}
    }
}
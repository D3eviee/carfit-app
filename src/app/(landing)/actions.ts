'use server'
import { userAuth } from "@/lib/auth"
import prisma from "@/lib/db"
import { NewReservation } from "@/lib/types"

// DASHBOARD/CALENDAR -> MODAL
// THIS FUNCTION GETS EXISTING APPOINTMETS FOR MONTH OF SELECTED DATE
// IT'S USED IN MODAL TO FILTER THE AVAILABLE APPOINTMENT HOURS
export const getActiveMonthAppointments = async(activeDate:Date, businessId:string) => {
    const activeDateYear = activeDate.getFullYear()
    const activeDateMonth = activeDate.getMonth()+1
    
    try{
        const reservationForSelectedMonth = await prisma.reservation.findMany({
            where: {
                businessId: businessId,
                reservationYear:activeDateYear,
                reservationMonth: activeDateMonth,
                status: "reserved"
            },
            select: {
                reservationStart: true,
                reservationEnd: true,
                duration: true
           }
        })

        if(!reservationForSelectedMonth) return {success: false, message: "Wystąpił problem podczas pobierania danych"}
        return  {success: true, data: reservationForSelectedMonth }
    }catch(error){
       return {success: false, message: "Wystąpił problem podczas pobierania danych"+ error}
    }
}

// function for getting categories and services for booking page
export const getBusinessCategoriesAndServices = async (id:string) => {
    try{
        const categoriesData = await prisma.categories.findMany({
            where: {
                serviceId: id,
                archived: false,
            },
            select: {
                id: true,
                name: true,
                services: true
            }
        })

        if(!categoriesData) return {success: false, message: "Wystąpił problem podczas pobierania danych."}
        return { success: true, data: categoriesData }
    }catch(err){
        return {success: false, message: "Wystąpił problem podczas pobierania danych." + err}
    }
}

// adding new reservation from booking page
export const addReservation = async (reservation:NewReservation) => {
    try{
        const client = await userAuth()

        if(client.success){
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
                    clientMessage: reservation.clientMessage,
                    clientCar: reservation.clientCar
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
        }

        return {status: false, error: "Wystąpił problem podczas próby rezerwacji"}
    }catch{
        return {status: false, error: "Wystąpił problem podczas próby rezerwacji"}
    }
}

export const getBusinessWorkingHours = async (businessId: string) => {
    try {
        const workingHoursData = await prisma.workingDay.findMany({
            where: { serviceId:businessId },
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

// LANDING.SERVICE -> GETS ALL THE DATA FOR SERVICE
export const getServiceData = async (id: string) => {
    try {
        const serviceDataResponse = await prisma.business.findFirst({
            where: {id: id},
            select: {
                name: true,
                phone: true,
                category: true,
                description: true,
                town: true,
                zipcode: true,
                district: true,
                street: true,
                images: true,
                facebookUrl: true,
                instagramUrl: true,
                websiteUrl: true,
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
                    where:{
                        archived: false,
                    },
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

        if(!serviceDataResponse) return { success: false, message: "Wystąpił problem podczas pobierania danych" }
        return { success: true, data: serviceDataResponse}
    }
    catch (error) {
        return { success: false, message: "Wystąpił problem podczas pobierania danych" + error }
    }
}
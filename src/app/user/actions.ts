'use server'
import { userAuth } from "@/lib/auth";
import prisma from "@/lib/db"

// APPOINTMENTS -> adds client review
export const addClientReview = async ({rate, title, comment, businessId, appointmentId }) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const newReview = await prisma.review.create({ 
            data: {
                reservationId: appointmentId,
                clientId: user.id,
                serviceId: businessId,
                rate: rate,
                title: title,
                content: comment,
            }
        })

        if(!newReview) return {success: false, message:`Wystąpił problem podczas dodawania opinii`}
        return { success: true, review: newReview }
    }catch(error){
        console.log(error)
        return {success: false, message: "ystąpił problem podczas dodawania opinii"}
    }
}

export const editClientReview = async ({rate, title, comment, businessId, appointmentId }) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const newReview = await prisma.review.update({ 
            where: {
                reservationId: appointmentId,
            },
            data: {
                rate: rate,
                title: title,
                content: comment,
            }
        })

        if(!newReview) return {success: false, message:`Wystąpił problem podczas aktualizowania opinii`}
        return { success: true, review: newReview }
    }catch(error){
        console.log(error)
        return {success: false, message: "ystąpił problem podczas aktualizowania opinii"}
    }
}

// APPOINTMENTS -> getting all client appointments
export const getClientAppointments = async () => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "UŻytkownik niezalogowany. Odmowa dostępu."}

        const rawNow= new Date()
        const now = new Date(rawNow.getTime() + 2 * 60 * 60 * 1000)
        
        await prisma.reservation.updateMany({
            where: {
                clientId: user.id,
                reservationEnd: { lte: now},
                status: "reserved"
            },
            data: { status: "finished" }
        })

        const clientAppointments =  await prisma.reservation.findMany({
            where: { clientId: user.id },
            select: {
                id: true,
                reservationStart: true,
                duration: true,
                status: true,
                clientMessage: true,
                services: {
                    select: {
                        service: {
                            select: {
                                name: true,
                                price: true,
                            }
                        }
                    }
                },
                business: {
                    select: {
                        id: true,
                        image: true,
                        name: true,
                        street: true,
                        district: true,
                        town: true,
                    }
                },
                Review: {
                    select: {
                        id: true,
                        content: true, 
                        rate: true,
                        title: true,
                        reservationId:true,
                    }
                }
            },
            orderBy: {reservationStart: "desc"}
        })
        
        return {success: true, data: clientAppointments}
    }catch(error){
        console.error(error)
        return {success: false, message: "Błąd podczas ładowaina danych"}
    }
}

// APPOINTMENTS -> deleting user appointment
export const deleteAppointment = async (appointmentId:string) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "No-authenticated user. Log in"}

        const deletedAppointment = await prisma.reservation.update({
            where: {
                id: appointmentId,
                clientId : user.id
            },
            data: { status: "Odwołana" }
        })


        return {success: true, data: deletedAppointment}
    } catch (error) {
        return {success: false, message: "Wystąpił problem podczas próby odwołania wizyty" + error}
    }
}
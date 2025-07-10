'use server'
import { userAuth } from "@/lib/auth";
import prisma from "@/lib/db"
import { count } from "console";

// getting all client appointments
export const getClientAppointments = async () => {
    try {
        const user = await userAuth()

        if(!user.success) return {success: false, message: "No-authenticated user. Log in."}

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
                    serviceId: true,
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
                    name: true,
                    street: true,
                    district: true,
                    town: true,
                }
            },
        },
        orderBy: {reservationStart: "desc"}
        })
        return {success: true, data: clientAppointments}
    }catch(error){
        return {success: false, message: "Server problem occured." + error}
    }
}

//getting user profile information 
export const getUserProfileData = async () => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "No-authenticated user. Log in"}
        
        const userData = await prisma.client.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                email: true,
                image: true,
                name: true,
                phone: true,
                Reservation: {
                    select: {
                        charge: true,
                    }
                }
            }
        })

         return {success: true, data: userData}
    }catch(error){
        return {success: false, message: "Server error occured while getting data: " + error}
    }
}

//updating user profile information 
export const updateUserData = async (data) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "No-authenticated user. Log in"}

        const userData = await prisma.client.update({
            where: {
                id: user.id
            },
            data: {
                name: data.name,
                phone: data.phone,
            }
        })

        return {success: true, data: userData}
    } catch (error) {
        return {success: false, message: "There was a server problem while updating profile data " + error}
    }
}
// deleting user profile photo
export const deleteUserProfilePhoto = async () => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "No-authenticated user. Log in"}

        const userData = await prisma.client.update({
            where: {
                id: user.id
            },
            data: {
                image: null,
            }
        })

        return {success: true, data: userData}
    } catch (error) {
        return {success: false, message: "There was a server problem deleting image " + error}
    }
}


//deleting user appointment
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
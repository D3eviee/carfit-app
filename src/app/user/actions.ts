'use server'
import { userAuth } from "@/lib/auth";
import prisma from "@/lib/db";

// getting all client appointments
export const getClientAppointments = async () => {
    try {
        const user = await userAuth()

        if(!user.success) return {success: false, message: "No-authenticated user. Log in."}

        const clientAppointments =  await prisma.reservation.findMany({
        where: { clientId: user.id },
        select: {
            reservationStart: true,
            status: true,
            services: {
                select: {
                    serviceId: true
                }
            },
            business: {
                select: {
                    name: true,
                    street: true,
                    district: true,
                    town: true,
                }
            }
        }
        })
        return {success: true, data: clientAppointments}
    }catch(error){
        return {success: false, message: "Server problem occured." + error}
    }
}

//GETTING BUSINESS DATA FOR USER APPOINTMENT
export const getAppointmentBusinessData = async (id: string) => {
    try {
        const businessData = await prisma.business.findFirst({
            where: {
                id: id
            },
            select: {
                name: true,
                phone: true,
                image: true,
                town: true,
                district: true,
                zipcode: true,
                street: true,
            }
        })

        return businessData
    }
    catch (error) {
        console.log("Error while trying to retreieve service data:", error)
    }
}


//function for getting user profile information 
export const getUserProfileData = async () => {
    const userId = await userAuth()

    try {
        const userData = await prisma.client.findUnique({
            where: {
                id: userId.id
            },
            select: {
                id: true,
                email: true,
                image: true,
                name: true,
                phone: true,
                Reservation:{
                    select: {
                        charge: true
                    }
                }
            }
        })
        
        return userData
    } catch (error) {
        return error
    }
}

export const updateUserData = async (data) => {
    const userId = await userAuth()

    try {
        const userData = await prisma.client.update({
            where: {
                id: userId.id
            },
            data: {
                name: data.name,
                phone: data.phone,
            }
        })

        return userData
    } catch (error) {
        return error
    }
}
'use server'
import { businessAuth } from "@/lib/auth"
import prisma from "@/lib/db"

export const getAppointmentsTableData = async ()=> {
    try {
        const business = await businessAuth()
        if(!business.success) return {success: false, message: "No-authenticated user"}

        const result =  await prisma.reservation.findMany({
            where: { businessId: business.id},
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

        if(!result)  return {success: false, message: "There was a problem with getting your data"}

        const tableData = result.map((item) => {
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

        return {success: true, data: tableData}
    }catch(error){
        return {success: false, message: "Wystąpił problem z serwerem, proszę spróbuj później" + error}
    }
}
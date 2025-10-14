'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db";
import { addMinutes, getMonth, getYear } from "date-fns";

// DASHBOARD/CALENDAR 
// THIS FUNCTION IS USED TO FETCH APPOINTMENTS FOR SPECIFIC WEEK IN CALENDAR
// IT GETS WEEK INTERVAL AND RETURN APPOINTMENTS FOR THIS WEEK
export const getAppointmentsForWeekInterval = async (weekInterval: Date[]) => {
    try{
        const business = await businessAuth()
        if(business.success == false) return {success: false, message: "Brak autoryzacji. Zaloguj się."} 

        const rawNow= new Date()
        const now = new Date(rawNow.getTime() + 2 * 60 * 60 * 1000)

        await prisma.reservation.updateMany({
            where:{
                businessId: business.id,
                reservationEnd: { lte: now},
                status: "reserved"
            },
            data:{ status: "finished" }
        })

        const weekReservations =  await prisma.reservation.findMany({
            where: {
                businessId: business.id,
                reservationStart: {
                    gte: weekInterval[0], // start of week
                    lte: weekInterval[weekInterval.length], // end of week
                },
                status: { not: "canceled" }
            },
            select: {
                id: true,
                clientName: true, 
                clientPhone: true,
                clientMessage: true,
                clientCar: true,
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
                    clientImage: null,
                    clientMessage: item.clientMessage,
                    clientCar: item.clientCar,
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
                    clientMessage: item.clientMessage,
                    clientCar: item.clientCar,
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
        console.error(error)
        return {success: false, message: "Wystąpił problem serwera podczas ładowania danych"}
    }
}

// DASHBOARD/CALENDAR -> MODAL
// THIS FUNCTION GETS EXISTING APPOINTMETS FOR MONTH OF SELECTED DATE
// IT'S USED IN MODAL TO FILTER THE AVAILABLE APPOINTMENT HOURS
export const getActiveMonthAppointments = async(activeDate:Date) => {
    const activeDateYear = activeDate.getFullYear()
    const activeDateMonth = activeDate.getMonth()+1
    
    try{
        const business = await businessAuth()
        if(business.success == false) return {success: false, message: "Brak autoryzacji. Zaloguj się"} 

        const reservationForSelectedMonth = await prisma.reservation.findMany({
            where: {
                businessId: business.id,
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

type NewAppointmentManual =  {
  clientName: string
  clientPhone: string
  clientCar: string
  reservationStart: Date 
  duration: number
  charge: number
  servicesIds: string[]
  description: string
}

//FUNCTION FOR ADDING RESERVATION MANUALLY
export const addNewAppointmentManual = async (reservation:NewAppointmentManual) => {
  const {clientName, clientPhone, reservationStart, duration, charge, servicesIds, clientCar, description} = reservation

  try{
      const businessData = await businessAuth()
      if(!businessData.success) return {success: false, message: "Brak dostępu. Zaloguj się"}

      const addReservationResult = await prisma.reservation.create({
          data: {
            businessId: businessData.id,
            reservationYear: getYear(reservationStart),
            reservationMonth: getMonth(reservationStart) + 1,
            reservationStart: reservationStart,
            reservationEnd: addMinutes(reservationStart, duration),
            duration: duration,
            charge: charge,
            status: "reserved",
            clientName: clientName,
            clientPhone: clientPhone,
            isAddedByBusiness: true,
            clientCar: clientCar,
            clientMessage: description,
          }
        })
        if(!addReservationResult) return {success: false, message: "Wystąpił problem podczas dodwania rezerwacji"}
        
        const addServicesResult =  await Promise.all(
          servicesIds.map((serviceId) =>
            prisma.reservationServices.create({
              data: {
                reservationId: addReservationResult.id,
                serviceId: serviceId
              }
          }))
        )
        if(!addServicesResult) return {success: false, message: "Wystąpił problem podczas dodwania rezerwacji"}
        return {success: true, message: "Dodano rezerwację"}
  }catch(error){
      return {success: false, message: "There was a server error with adding appointment" + error}
  }
}
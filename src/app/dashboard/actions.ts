'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db"
import { addDays, format, getDaysInMonth, isSameDay, isThisWeek, lastDayOfMonth, startOfISOWeek, startOfMonth } from "date-fns";
import { pl } from "date-fns/locale";

// DASHBOARD/HOME -> This function gets appointment for current day
export const getTodayAppointments = async () => {
  const startOfDay = new Date()
  const endOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  endOfDay.setHours(23, 59, 59, 999)

  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzajcji. Zaloguj się."}

    const rawNow= new Date()
    const now = new Date(rawNow.getTime() + 2 * 60 * 60 * 1000)
    await prisma.reservation.updateMany({
      where:{
        businessId: business.id,
        reservationEnd: { lte: now},
        status: "reserved"
      },
      data:{
        status: "finished"
      }
    })

    const reservationResult = await prisma.reservation.findMany({
      where: {
        reservationStart: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {not: "canceled"},
        businessId: business.id
      },
      select: {
        id: true, 
        clientId: true,
        client: {
          select: {
            image: true,
            name: true, 
            phone: true, 
          }
        },
        clientMessage: true,
        clientName: true,
        clientPhone: true,
        clientCar: true,
        charge: true,
        duration: true,
        reservationStart: true,
        status: true,
        services: {
          select: {
            service: {
              select:{
                name: true,
                price: true,
              }
            }
          }
        }
      },
      orderBy:{
        reservationStart: "asc"
      }
    })

     if(!reservationResult)  return {success: false, message: "Wystiąpoł problem podczas pobierania danych"}
    
     const todayAppointments = reservationResult.map((item) => {
      const servicesData = item.services.map((service) => ({name:service.service.name, price: service.service.price}))
      
      if(item.clientId == null){
        return {
          appointmentId: item.id,
          clientName: item.clientName,
          clientPhone: item.clientPhone,
          clientImage: "https://carfitapp.s3.eu-north-1.amazonaws.com/BusinessGallery/fe69e074-0cef-48af-880b-e08895d1d734/ecc30e22-1193-413e-96ec-d84222d95b88",
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
    return {success: true, data: todayAppointments}
  }catch (error) {
    console.error(error)
    return {success: false, message: "Wystąpił problem podczas ładowania danych"}
  }
}

// get reservation number for chart
export const getVisitChartData = async () => {
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = lastDayOfMonth(today)

  const business = await businessAuth()
  if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}

  try {
    const lastMonthAppointments = await prisma.reservation.findMany({
      where: {
        businessId: business.id,
        reservationStart: {
          gte: monthStart,
          lte: monthEnd,
        }
      },
      select: {
        charge: true,
        duration: true,
        reservationStart: true,
        status: true,
        services: {
          select: {
            service: {
              select:{
                name: true
              }
            }
          }
        }
      },
    })

   const monthNumbers: { day: string; visits: number, cancelled: number  }[] = [];
   const weekNumbers: { day: string; visits: number, cancelled: number }[] = [];

    for (let i = 0; i < getDaysInMonth(monthStart) ; i++) {
      const dayInMonth = addDays(startOfMonth(today), i)

      const visitsPerDay = lastMonthAppointments.filter(item =>
        isSameDay(item.reservationStart, dayInMonth)
      ).length

      const canceledVisits = lastMonthAppointments.filter(item =>
        isSameDay(item.reservationStart, dayInMonth) && item.status == "canceled"
      ).length

      monthNumbers.push({
        day: format(dayInMonth, 'd', {locale: pl}), 
        visits: visitsPerDay-canceledVisits,
        cancelled: canceledVisits
      })
      
      if(isThisWeek(dayInMonth)){
        weekNumbers.push({
          day: format(dayInMonth, 'EEEE', {locale: pl}), 
          visits: visitsPerDay-canceledVisits,
          cancelled: canceledVisits
        })
      }
    }

    return {success: true, data: {month: monthNumbers, week:weekNumbers}}
  } catch (error) {
    console.error(error)
    return {success: false, message: "Wystąpił problem podczas pobierania danych"}
  }
}

// DASHBOARD/HOME -> get top services for chart
export const getServicesChartData = async () => {
  const today = new Date()
  const weekStart = startOfISOWeek(today)

  try {
    const business = await businessAuth()
    if(!business.success) return { success: false, message: "Brak autoryzacji. Zaloguj się."}
    const topServicesResult = await prisma.reservation.findMany({
      where: {
        businessId: business.id,
        reservationStart: {
          gte: weekStart,
          lte: today,
        },
        status: {not: "canceled"}
      },
      select: {
        services: {
          select: {
            service: { select: { name: true }}
          }
        }
      },
    })
  
    const serviceCount: Record<string, number> = {}
    topServicesResult.forEach(res => {
      res.services.forEach(({ service }) => {
        const serviceName = service.name
        serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1
      })
    })

    const topServices = Object.entries(serviceCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    return  {success: true, data: topServices}
  } catch (error) {
    return  {success: false, message: "Wystąpił problem podczas pobierania danych " + error}
  }
}

/////
//BEFORE REFACTORING
type  GetAppointmentsForMonthIntervalProps = {
  monthInterval : Date[]
}

export const getAppointmentsForMonthInterval = async ({monthInterval}: GetAppointmentsForMonthIntervalProps ) => {
  return await prisma.reservation.findMany({
    where: {
      reservationStart: {
        gte: monthInterval[0], // month start
        lte: monthInterval[monthInterval.length - 1], // month end
      },
    },    
    select: {
      clientPhone: true, 
      clientName: true,
      duration : true,
      reservationStart: true,
      charge: true,
      clientId:true,
      services: true,
      client:{
        select: {
          name:true,
          email: true,
          image: true
        }
      }
    }
  })
}


export const getActiveMonthAppointments = async(date:Date) => {
  const selectedDate = new Date(date)
  const activeDateYear = selectedDate.getFullYear()
  const activeDateMonth = selectedDate.getMonth()+1

  try{
      const business = await businessAuth()
      if(!business.success) return {success: false, message: "No-authenticated user. Log-in"}

      const reservationForDay = await prisma.reservation.findMany({
          where: {
              businessId: business.id,
              reservationYear:activeDateYear,
              reservationMonth: activeDateMonth,
          },
         select: {
          reservationStart: true,
          reservationEnd: true,
          duration: true
         },
      })

      return {success: true, data: reservationForDay}
  }catch(error){
      return {success: false, message: "Server problem while getting data: " + error}
  }
}

export const getSettingsBusinessData = async () => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się."}
    
    const serviceSettingsData = await prisma.business.findFirst({
      where: {
        id: business.id
      },
      select: {
        email: true, 
        image: true, 
        description: true,
        name: true, 
        owner: true, 
        password: true, 
        phone: true, 
        street: true, 
        district: true,
        town: true,
        zipcode: true,
        facebookUrl: true, 
        instagramUrl: true,
        websiteUrl: true,
      }
    })
    
    return {success: false, data: serviceSettingsData}
  } catch (error) {
    console.error(error)
    return {success: false, message: "Wystąpił problem podczas pobierania danych"}
  }
}

// DASHBOARD -> APPOINTMENTS
// FUNCTION FOR CANCELING RESERVATION
export const cancelAppointment = async (appointmentId:string) => {
    try{
        const businessData = await businessAuth()
        if(!businessData.success) return {success: false, message: "Brak dostępu. Zaloguj się"} 

        const deleteAppointment = await prisma.reservation.update({ where: {id: appointmentId}, data: {status: "canceled"}})
        if(!deleteAppointment) return {success: false, message: "Wystąpił błąd podczas próby anulowania wizyty"}
        return {success: true, message:"Wizyta została odwołana", data: deleteAppointment}
    }catch(error){
        return {success: false, message: "Wystąpił błąd podczas próby anulowania wizyty"+ error}
    }
}
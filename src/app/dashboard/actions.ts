'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db"
import { addDays, addMinutes, format, getDate, getDaysInMonth, getMonth, getYear, isSameDay, isThisWeek, lastDayOfMonth, startOfMonth, startOfWeek, } from "date-fns";
import { pl } from "date-fns/locale";

//get reservations for current day
export const getTodayReservations = async () => {
  const date = new Date()
  const year = getYear(date) 
  const month = getMonth(date)+1
  const todayDay = getDate(date) 

  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "There was a problem with getting your current month reservations data"}

    const reservationsThisMonth = await prisma.reservation.findMany({
      where: {
        businessId: business.id,
        reservationYear: year,
        reservationMonth: month,
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
    
    const todayReservations = reservationsThisMonth.filter((item) => {
     return getDate(item.reservationStart) == todayDay
    })

    return {success: true, data: todayReservations}
  }catch (error) {
    return {success:false, message: "There was a server problem: "+ error}
  }
}

// get reservation number for chart
export const getLastMonthReservationChartData = async () => {
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = lastDayOfMonth(today)

  const business = await businessAuth()
  if(!business.success) return {success: false, message: "Non-authenticated user"}

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
        isSameDay(item.reservationStart, dayInMonth) && item.status == "Odwołana"
      ).length

      monthNumbers.push({
        day: format(dayInMonth, 'd', {locale: pl}), 
        visits: visitsPerDay-canceledVisits,
        cancelled: canceledVisits
      })
      
      if(isThisWeek(dayInMonth)){
        weekNumbers.push({
          day: format(dayInMonth, 'EEE', {locale: pl}), 
          visits: visitsPerDay-canceledVisits,
          cancelled: canceledVisits
        })
      }
    }

    return {success: true, data: {month: monthNumbers, week:weekNumbers}}
  } catch (error) {
    return {success: false, message: "There was a server problem. Try later: " + error}
  }
}


//get top services for chart
export const getTopServicesChartData = async () => {
  const today = new Date()
  const weekStart = startOfWeek(today)

  const business = await businessAuth()
  if(!business.success) return { success: false, message: "Non-authenticated user"};

  try {
    const topServicesData = await prisma.reservation.findMany({
      where: {
        businessId: business.id,
        reservationStart: {
          gte: weekStart,
          lte: today,
        }
      },
      select: {
        services: {
          select: {
            service: {
              select: {
                name: true
              }
            }
          }
        }
      },
    })
  
    const serviceCount: Record<string, number> = {}

    topServicesData.forEach(res => {
      res.services.forEach(({ service }) => {
        const serviceName = service.name
        serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1
      })
    })

    const topServices = Object.entries(serviceCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

      
    console.log(topServices)

    return  {success: true, data: topServices}
  } catch (error) {
    return  {success: false, message: "There was an server problem while getting data: " + error}
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
  });
};


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


type ManualReservationProps =  {
  clientName: string
  clientPhone: string
  reservationStart: Date 
  duration: number
  charge: number
  servicesIds: string[]
}

//FUNCTION FOR ADDING RESERVATION MANUALLY
export const addNewReservationManually = async (reservation:ManualReservationProps) => {
  const {clientName, clientPhone, reservationStart, duration, charge, servicesIds } = reservation

  try{
      const businessData = await businessAuth()

      if(!businessData.success) return {success: false, message: "Non-authorized user. Log in"}

      const newReservation = await prisma.reservation.create({
          data: {
            businessId: businessData.id,
            reservationYear: getYear(reservationStart),
            reservationMonth: getMonth(reservationStart) + 1,
            reservationStart: reservationStart,
            reservationEnd: addMinutes(reservationStart, duration),
            duration: duration,
            charge: charge,
            status: "Zarezerwowana",
            clientName: clientName,
            clientPhone: clientPhone,
            isAddedByBusiness: true,
          }
        });
        
        await Promise.all(
          servicesIds.map((serviceId) =>
            prisma.reservationServices.create({
              data: {
                reservationId: newReservation.id,
                serviceId: serviceId
              }
          }))
        )
        
      return {success: true, data: newReservation}
  }catch(error){
      return {success: false, message: "There was a server error with adding appointment" + error}
  }
}


export const getSettingsDataForBusiness = async () => {
  try {
    const business = await businessAuth()

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
      }
    })
    
    return serviceSettingsData
  } catch (error) {
    console.log("Error occured" + error)
  }
}

//FUNCTION FOR UPDATING SETTING IN DATABASE
export const setSettingDataForBusiness = async (data:Record<string, string>) => {
  try {
    const business = await businessAuth()

    const setServiceSettingsData = await prisma.business.update({
      where: {
        id: business.id
      },
      data: {
        ...data
      }
    })

    return setServiceSettingsData
  } catch (error) {
    console.log("Error occured" + error)
  }
}

//FUNCTION FOR UPDATING SETTING IN DATABASE
export const getWorkingTimeData = async () => {
  try {
      const businessData = await businessAuth()

      const workingTimeData = await prisma.workingDay.findMany({
          where: {
              serviceId: businessData.id
          }
      })

      const dayOrder = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7
      };

      const sortedWeek = workingTimeData.sort(
        (a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek]
      );

      return sortedWeek
  }
  catch (error) {
      console.log("Error while trying to retreieve working time data:", error)
  }
}

type SetWorkingTimeDataDaysDataProps =  {
  id: string
  isOpen: boolean
  open: string
  close: string
  dayOfWeek: string
}[]


//FUNCTION FOR UPDATING WORKING DAYS
export const setWorkingTimeData = async (daysData:SetWorkingTimeDataDaysDataProps) => {
  try {
    const businessData = await businessAuth();

    const updatePromises = daysData.map((dayData) => {
      return prisma.workingDay.update({
        where: {
          serviceId_dayOfWeek: {
            serviceId: businessData.id,
            dayOfWeek: dayData.dayOfWeek
          },
        },
        data: {
          isOpen: dayData.isOpen,
          open: dayData.open,
          close: dayData.close,
        }
      });
    });

    const results = await Promise.all(updatePromises);
    return results;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating working days");
  }
};

// getting user images on gallery page
export const getBusinessImages = async () => {
  try{
    const business = await businessAuth()

    if(!business.success) return {success: false, message: "No-authenticated. Log in!"}
    
    const businessImages = await prisma.image.findMany({
          where: {businessId: business.id}
    })

    return {success: true, data:businessImages }
  }catch(error){
    return {success: false, message: "Error while loading iamges: " + error}
  }
}
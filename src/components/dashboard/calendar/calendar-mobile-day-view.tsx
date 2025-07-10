'use client'
import {addDays, eachDayOfInterval, eachHourOfInterval, format,getDate ,isSameDay,lastDayOfISOWeek,set, startOfISOWeek, subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useBusinessSmallCallendarStore } from "@/lib/store";
import { getAppointmentsForWeekInterval } from "@/app/dashboard/calendar/actions";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { pl } from "date-fns/locale";
import { cn } from "@/utils";
import { useState } from "react";
import { CalendarAppointmentOverviewProps } from "@/lib/types";
import CalendarMobileDayEvent from "./calendar-mobile-day-event";

export default function CalendarMobileDayView() {
  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)
  const setActiveDay = useBusinessSmallCallendarStore(store => store.setActiveDay)

  const currentWeekInterval: Date[] = eachDayOfInterval({
    start: startOfISOWeek(activeDay),
    end: lastDayOfISOWeek(activeDay),
  })

  const { data: reservationsForWeekData, status:reservationsForWeekStatus } = useQuery({
    queryKey:['getAppointmentsForWeekInterval ', currentWeekInterval],
    queryFn: async () => {
      const response = await getAppointmentsForWeekInterval(currentWeekInterval);
      if(!response.success) return null 
      return response.data
    }
  })

  const hours = eachHourOfInterval({
    start: set(new Date(), {
      hours: 6,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).toISOString(),
    end: set(new Date(), {
      hours: 20,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).toISOString(),
  });

  const handleNextWeek = () => {
    setActiveDay(addDays(activeDay, 7))
  }

  const handlePreviousWeek = () => {
    setActiveDay(subDays(activeDay, 7))
  }

  if(reservationsForWeekStatus == "pending") return <Spinner/>
  if(reservationsForWeekStatus == "error") return <Error/>

  const weekdays= ["P", "W", "Ś", "C","P", "S" ,"S"]

  // helpers for appointment date 
  const rawDayOfWeek = format(activeDay, "EEEE", { locale: pl })
  const dayOfWeekFormatted = rawDayOfWeek.charAt(0).toUpperCase() + rawDayOfWeek.slice(1)
  const rawShortAppointmentMonth = format(activeDay, "LLL", { locale: pl })
  const shortAppointmentMonth = rawShortAppointmentMonth.charAt(0).toUpperCase() + rawShortAppointmentMonth.slice(1)
  const appointmentDayOfMonth = format(activeDay, "d", { locale: pl })
  const appointmentYear = format(activeDay, "y")
  const fullDate = `${dayOfWeekFormatted} - ${appointmentDayOfMonth} ${shortAppointmentMonth} ${appointmentYear}` 

  //Formatting dates for buttons
  const startOfPreviousWeek = `${format(subDays(currentWeekInterval[0], 7), "LLL", { locale: pl })} ${format(subDays(currentWeekInterval[0], 7), "d", { locale: pl })}`
  const endOfPreviousWeek = `${format(subDays(currentWeekInterval[0], 1), "LLL", { locale: pl })} ${format(subDays(currentWeekInterval[0], 1), "d", { locale: pl })}`
  const startOfNextWeek = `${format(addDays(currentWeekInterval[6], 1), "LLL", { locale: pl })} ${format(addDays(currentWeekInterval[6], 1), "d", { locale: pl })}`
  const endOfNextWeek = `${format(addDays(currentWeekInterval[6], 1), "LLL", { locale: pl })} ${format(addDays(currentWeekInterval[6], 7), "d", { locale: pl })}`
  const startOfPreviousWeekFormatted = startOfPreviousWeek.charAt(0).toUpperCase() + startOfPreviousWeek.slice(1)
  const endOfPreviousWeekFormatted = endOfPreviousWeek.charAt(0).toUpperCase() + endOfPreviousWeek.slice(1)
  const startOfNextWeekFormatted = startOfNextWeek.charAt(0).toUpperCase() + startOfNextWeek.slice(1)
  const endOfNextWeekFormatted = endOfNextWeek.charAt(0).toUpperCase() + endOfNextWeek.slice(1)

  return (
      <div className="w-full h-full flex flex-col rounded-lg border py-2">
        {/* CALENDAR NAVIGATION */}
        <div className="w-full flex flex-col  gap-3">
          {/* BUTTONS FOR MANAGMENT */}
          <div className="flex flex-row gap-3 p-1">
            <button 
              className="w-full flex justify-center items-center bg-[#000] hover:bg-[#222] rounded-lg py-1.5" 
              onClick={handlePreviousWeek}
            >
             <p className="text-white text-sm font-light">{`${startOfPreviousWeekFormatted} - ${endOfPreviousWeekFormatted}`}</p>
            </button>
            <button 
              className="w-full flex justify-center items-center bg-[#000] hover:bg-[#222] rounded-lg py-1.5"
              onClick={handleNextWeek}
            >
              <p className="text-white text-sm font-light">{`${startOfNextWeekFormatted} - ${endOfNextWeekFormatted}`}</p>
            </button>
          </div>
          <div className="w-full flex items-center justify-evenly py-1">
            {weekdays.map((dayName:string, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="text-center text-xs font-light text-[#111]">{dayName}</div>
              </div>
            ))}
          </div>
           <div className="w-full flex items-center justify-evenly py-1">
            {currentWeekInterval.map((day:Date, index) => (
              <div key={index} className="w-full flex justify-center">
                <p
                  onClick={() => setActiveDay(day)} 
                  className={cn("text-center text-xs font-light text-[#111] px-3 py-1 rounded-full ", isSameDay(day,activeDay) && "bg-[#FF5F57] text-white font-medium")}>{getDate(day)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center border-y p-0.5">
            <p className="text-sm text-[#111] font-medium">{fullDate}</p>
          </div>
        </div>

        <div className="overflow-scroll pt-3">
          <div className="flex flex-row">
              {/* HOURS COLUMN*/}
              <div className="flex flex-col p-1">
                {hours.map((item, i) => 
                  <div key={i} className="h-20 flex justify-center items-start">
                    <p className="text-sm text-[#111] font-normal">{format(item, "k")}:00</p>
                  </div>
                )}
              </div>

              {/* Kolumny dla każdego dnia tygodnia */}
              <div className="relative w-full pr-1">
                  {hours.map((_, i) => (
                    <div key={i} className="border-t h-20"></div>
                  ))}
                  {reservationsForWeekData?.map((item, index)=>(
                    isSameDay(activeDay, item.reservationStart) && 
                      <CalendarMobileDayEvent 
                        event={item}
                        key={index}
                      />
                  ))}
              </div>
          </div>
        </div>  
      </div>
  );
}

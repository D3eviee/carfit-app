'use client'
import {addDays, eachDayOfInterval, eachHourOfInterval, format,getDate ,isSameDay,lastDayOfISOWeek,set, startOfISOWeek, subDays } from "date-fns";
import { useBusinessSmallCallendarStore } from "@/lib/store";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { pl } from "date-fns/locale";
import { cn } from "@/utils";
import { DashboardCalendarMobileDayViewAppointment } from "./dashboard-calendar-mobile-day-view-appointment";
import { useAppointmentForWeek } from "@/lib/hooks/dashboard/useAppointmentsForWeek";

const weekdays= ["P", "W", "Ś", "C","P", "S" ,"S"]

export const DashboardCalendarMobileDayView = () => {
  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)
  const setActiveDay = useBusinessSmallCallendarStore(store => store.setActiveDay)

  const currentWeekInterval: Date[] = eachDayOfInterval({
    start: startOfISOWeek(activeDay),
    end: lastDayOfISOWeek(activeDay),
  })

  const { data: reservationsForWeekData, status:reservationsForWeekStatus } = useAppointmentForWeek(currentWeekInterval)

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
    <div className="w-full h-full flex flex-col rounded-2xl py-3 border-[0.5px] border-[#D4D4D4]">
      {/* CALENDAR HEADER */}
      <div className="w-full flex flex-col gap-3">
        {/* NAVIGATION BUTTONS*/}
        <div className="flex flex-row gap-8 px-3">
          <button 
            className="w-full flex justify-center items-center bg-[#F2F2F7] rounded-xl py-1.5 inset-shadow-glass hover:bg-[#F9F9F9] active:scale-95" 
            onClick={handlePreviousWeek}
          >
            <p className="text-[#191919] text-sm">{`${startOfPreviousWeekFormatted} - ${endOfPreviousWeekFormatted}`}</p>
          </button>
          <button 
            className="w-full flex justify-center items-center bg-[#F2F2F7] rounded-xl py-1.5 inset-shadow-glass hover:bg-[#F9F9F9] active:scale-95" 
            onClick={handleNextWeek}
          >
            <p className="text-[#191919] text-sm">{`${startOfNextWeekFormatted} - ${endOfNextWeekFormatted}`}</p>
          </button>
        </div>

        {/* DAY SIGNS */}
        <div className="w-full flex items-center justify-evenly py-1">
          {weekdays.map((dayName:string, index) => (
            <div key={index} className="w-full flex justify-center">
              <div className="text-center text-xs font-light text-[#111]">{dayName}</div>
            </div>
          ))}
        </div>
        
        {/* DAY NUMBERS */}
        <div className="w-full flex items-center justify-evenly">
          {currentWeekInterval.map((day:Date, index) => (
            <div key={index} className="w-full flex justify-center">
              <p
                onClick={() => setActiveDay(day)} 
                className={cn("text-center text-xs font-light text-[#111] px-3 py-1 rounded-full ", isSameDay(day,activeDay) && "bg-[#FF5F57] text-white font-medium")}>{getDate(day)}
              </p>
            </div>
          ))}
        </div>
        
        {/* SELECTED DAY DATE */}
        <div className="flex justify-center border-y-[0.5px] p-0.5 border-y-[#D4D4D4]">
          <p className="text-sm text-[#2B2B2B] font-medium">{fullDate}</p>
        </div>
      </div>

      <div className="overflow-scroll pt-3 scrollbar-none">
        <div className="flex flex-row">
          {/* HOURS COLUMN */}
          <div className="flex flex-col p-1">
            {hours.map((item, i) => 
              <div key={i} className="h-20 flex justify-center items-start">
                <p className="text-sm text-[#191919] font-light">{format(item, "k")}:00</p>
              </div>
            )}
          </div>
          
          {/* Kolumny dla każdego dnia tygodnia */}
          <div className="relative w-full pr-1">
            {hours.map((_, i) => <div key={i} className="h-20 border-t-[0.5px] border-t-[#D4D4D4]"></div> )}
              {reservationsForWeekData?.map((item, index) => 
                isSameDay(activeDay, item.reservationStart) && <DashboardCalendarMobileDayViewAppointment appointment={item} key={index}/> 
              )}
          </div>
        </div>
      </div>  
    </div>
  )
}

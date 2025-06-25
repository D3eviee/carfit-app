'use client'
import {addDays, eachDayOfInterval, eachHourOfInterval, format,isSameDay,lastDayOfISOWeek,set, startOfISOWeek, subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBusinessSmallCallendarStore } from "@/lib/store";
import { getAppointmentsForWeekInterval } from "@/app/dashboard/calendar/actions";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { pl } from "date-fns/locale";
import CalendarDayEvent from "./calendar-day-event";

export default function CalendarDayView() {
  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)
  const setActiveDay = useBusinessSmallCallendarStore(store => store.setActiveDay)

  //Formatting dates for buttons
  const nextDay =  `${format(addDays(activeDay, 1), "EEEEEE", { locale: pl })} ${format(addDays(activeDay, 1), "d", { locale: pl })}`;
  const previousDay = `${format(subDays(activeDay, 1), "EEEEEE", { locale: pl })} ${format(subDays(activeDay, 1), "d", { locale: pl })}`;;
  const nextDayFormatted = `${nextDay.charAt(0).toUpperCase() + nextDay.slice(1)}`
  const previousDayFormatted = `${previousDay.charAt(0).toUpperCase() + previousDay.slice(1)}`
  
  const todayDayOfMonth = `${format(activeDay, "d", {locale: pl})}`
  const todayDayOfWeek = `${format(activeDay, "iiii", {locale: pl})}`
  const todayMonth = `${format(activeDay, "LLLL", {locale: pl})}`
  const todayDayOfWeekFormatted = `${todayDayOfWeek.charAt(0).toUpperCase() + todayDayOfWeek.slice(1)}`
  const todayMonthFormatted = `${todayMonth.charAt(0).toUpperCase() + todayMonth.slice(1)}`
  const todayYear = `${format(activeDay, "y", {locale: pl})}`
  const todayFormatted =  `${todayDayOfWeekFormatted}, ${todayDayOfMonth} ${todayMonthFormatted} ${todayYear}`

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


  const handleNextDay = () => {
    setActiveDay(addDays(activeDay, 1))
  }

  const handlePreviousDay = () => {
    setActiveDay(subDays(activeDay, 1))
  }

  const handleToday = () => {
    const today = new Date()
    if(isSameDay(activeDay, today)) return 
    else setActiveDay(today)
  }

  if(reservationsForWeekStatus == "pending") return <Spinner/>
  if(reservationsForWeekStatus == "error") return <Error/>

  return (
    <div className="relative w-full h-full flex flex-col rounded-xl border min-h-0">
      {/* CALENDAR NAVIGATION */}
      <div className="relative flex flex-row items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <button 
            className="flex flex-row items-center bg-[#111] rounded-xl pr-2 py-1 hover:bg-[#222]" 
            onClick={handlePreviousDay}
          >
            <ChevronLeft size={22} color="#FFF" strokeWidth={1}/>
            <p className="text-white text-xs font-normal">{previousDayFormatted}</p>
          </button>
          <button 
            className="flex flex-row items-center bg-[#111] rounded-xl pl-2 py-1 hover:bg-[#222]" 
            onClick={handleNextDay}
          >
            <p className="text-white text-xs font-normal">{nextDayFormatted}</p>
            <ChevronRight size={22} color="#FFF" strokeWidth={1}/>
          </button>
          <p className="text-[#111] text-sm font-medium tracking-wide">{todayFormatted}</p> 
        </div>
        <div 
          className="flex flex-row items-center bg-[#111] rounded-xl px-3 py-1.5 text-white text-xs font-normal hover:bg-[#222] hover:cursor-pointer"
          onClick={handleToday}
        >
          Dzisiaj
        </div>      
      </div>

      {/* CALENDAR CONTENT */}
      <div className="w-full h-full flex flex-row overflow-y-scroll pt-1">
        {/* HOURS */}
        <div className="flex flex-col h-fit">
          {hours.map((item, i) => <div key={i} className="h-20 flex items-start text-sm font-light  px-2">{format(item, "kk")}:00</div>)}
        </div>

        {/* GRID */}
        <div className="h-fit w-full flex flex-col">
          <div className="flex flex-row w-full">
            <div className="relative w-full">
              {hours.map((_, i) => <div key={i} className="border-t h-20"></div>)}
              {reservationsForWeekData?.map((item, i)=> (
                isSameDay(activeDay, item.reservationStart) && <CalendarDayEvent key={i} event={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
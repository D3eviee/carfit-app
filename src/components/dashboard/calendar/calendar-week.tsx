'use client'
import {addDays, eachDayOfInterval, eachHourOfInterval, format,isSameDay,isToday,lastDayOfISOWeek,set, startOfISOWeek, subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarWeekViewEvent from "./calendar-week-view-event";
import { getAppointmentsForWeekInterval } from "@/app/dashboard/calendar/actions";
import { Error } from "@/components/error";
import { Spinner } from "@/components/spinner";
import { pl } from "date-fns/locale";
import { cn } from "@/utils";
import { useBusinessSmallCallendarStore } from "@/lib/store";

export default function CalendarWeek() {
  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)
  const setActiveDay = useBusinessSmallCallendarStore(store => store.setActiveDay)

  const [currentWeek, setCurrentWeek] = useState(eachDayOfInterval({
    start: startOfISOWeek(activeDay),
    end: lastDayOfISOWeek(activeDay),
  }))

  useEffect(() => {
    setCurrentWeek(eachDayOfInterval({
        start: startOfISOWeek(activeDay),
        end: lastDayOfISOWeek(activeDay)
    }))
  }, [activeDay])

  const { data: appointmentsForWeekIntervalData, status: appointmentsForWeekIntervalStatus } = useQuery({
    queryKey:['getAppointmentsForWeekInterval', currentWeek],
    queryFn: async () => {
      const response = await getAppointmentsForWeekInterval(currentWeek);
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
    setActiveDay(addDays(activeDay,7))
    setCurrentWeek((prevWeek) => {
      const newStartDate = addDays(prevWeek[0], 7);
      return eachDayOfInterval({
        start: newStartDate,
        end: addDays(newStartDate, 6),
      });
    })
  }

  const handlePreviousWeek = () => {
    setActiveDay(subDays(activeDay,7))
    setCurrentWeek((prevWeek) => {
      const newStartDate = subDays(prevWeek[0], 7);
      return eachDayOfInterval({
        start: newStartDate,
        end: addDays(newStartDate, 6),
      });
    })
  }

  const handleToday = () => {
    const today = new Date()
    setActiveDay(today)
    setCurrentWeek(eachDayOfInterval({
        start: startOfISOWeek(today),
        end: lastDayOfISOWeek(today)
    }))
  }

  //Formatting dates for buttons
  const startOfPreviousWeek = `${format(subDays(currentWeek[0], 7), "LLL", { locale: pl })} ${format(subDays(currentWeek[0], 7), "d", { locale: pl })}`
  const endOfPreviousWeek = `${format(subDays(currentWeek[0], 1), "LLL", { locale: pl })} ${format(subDays(currentWeek[0], 1), "d", { locale: pl })}`
  const startOfNextWeek = `${format(addDays(currentWeek[6], 1), "LLL", { locale: pl })} ${format(addDays(currentWeek[6], 1), "d", { locale: pl })}`
  const endOfNextWeek = `${format(addDays(currentWeek[6], 1), "LLL", { locale: pl })} ${format(addDays(currentWeek[6], 7), "d", { locale: pl })}`
  const startOfPreviousWeekFormatted = startOfPreviousWeek.charAt(0).toUpperCase() + startOfPreviousWeek.slice(1)
  const endOfPreviousWeekFormatted = endOfPreviousWeek.charAt(0).toUpperCase() + endOfPreviousWeek.slice(1)
  const startOfNextWeekFormatted = startOfNextWeek.charAt(0).toUpperCase() + startOfNextWeek.slice(1)
  const endOfNextWeekFormatted = endOfNextWeek.charAt(0).toUpperCase() + endOfNextWeek.slice(1)
  const navigationYear = `${format(currentWeek[3], "LLLL", { locale: pl })} ${format(currentWeek[3], "y", { locale: pl })}`
  const navigationYearFormatted = `${navigationYear.charAt(0).toUpperCase() + navigationYear.slice(1)}`

  if(appointmentsForWeekIntervalStatus == "pending") return <Spinner/>
  if(appointmentsForWeekIntervalStatus == "error") return <Error/>
  
  return (
    <div className="relative w-full h-full flex flex-col rounded-xl border min-h-0">
      {/* CALENDAR NAVIGATION */}
      <div className="relative flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <button 
          className="flex flex-row items-center bg-[#111] rounded-xl pr-2 py-1 hover:bg-[#222]" 
          onClick={handlePreviousWeek}
          >
            <ChevronLeft size={22} color="#FFF" strokeWidth={1}/>
            <p className="text-white text-xs font-normal">{`${startOfPreviousWeekFormatted} - ${endOfPreviousWeekFormatted}`}</p>
          </button>
          <button 
            className="flex flex-row items-center bg-[#111] rounded-xl pl-2 py-1 hover:bg-[#222]" 
            onClick={handleNextWeek}
          >
            <p className="text-white text-xs font-normal">{`${startOfNextWeekFormatted} - ${endOfNextWeekFormatted}`}</p>
            <ChevronRight size={22} color="#FFF" strokeWidth={1}/>
          </button>
          <p className="text-[#111] text-sm font-medium tracking-wide">{navigationYearFormatted}</p> 
        </div>
        <div 
          className="flex flex-row items-center bg-[#111] rounded-xl px-3 py-1.5 text-white text-xs font-normal hover:bg-[#222] hover:cursor-pointer"
          onClick={handleToday}
        >
          Dzisiaj
        </div>
      </div>

      { /* DAY HEADINGS */}
      <div className="flex flex-row justify-evenly border-y">  
        <div className="w-14"/> 
        <div className="flex flex-row w-full  items-center justify-evenly py-1">
          {currentWeek.map((item, i) => (
            <div key={i} className="w-full flex flex-row items-center justify-center gap-1">
              <p className="text-base text-[#111] font-normal">{`${format(item, "iii", {locale: pl}).slice(0,2)}`}</p>
              <p className={cn("text-base text-[#111] font-normal px-1 rounded-md", isToday(item) && "bg-[#FF5F58] text-[#FFF] font-medium")}>
              {`${format(item, "d")}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CALENDAR CONTENT */}
      <div className="w-full h-full flex flex-row overflow-y-scroll pt-1">
        <div className="flex flex-col h-fit">
          {hours.map((item, i) => <div key={i} className="h-20 flex items-start text-sm font-light  px-2">{format(item, "kk")}:00</div>)}
        </div>

        <div className="h-fit w-full flex flex-col">
          <div className=" flex flex-row justify-evenly">
            {currentWeek.map((day, index) => (
              <div key={index} className="relative w-full flex flex-col border-l border-[#E4E5E7] first-of-type:border-l-0">
                {hours.map((_, i) => <div key={i} className="border-t border-[#E4E5E7] h-20"></div>)}
                {appointmentsForWeekIntervalData?.map((item, i)=> isSameDay(day, item.reservationStart) && <CalendarWeekViewEvent event={item} key={i}/>)}
              </div>
            ))}
          </div>
        </div> 
      </div>
    </div>
  );
}
'use client'
import { addMonths, eachDayOfInterval, format,getDate,getDaysInMonth,getISODay,getMonth,getYear ,isSameDay,isToday,lastDayOfMonth, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";
import { useBusinessSmallCallendarStore } from "@/lib/store";

export default function CalendarMonth() {
  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)
  const setActiveDay = useBusinessSmallCallendarStore(store => store.setActiveDay)

  const activeMonth = getMonth(activeDay)
  const activeYear = getYear(activeDay)

  const daysInActiveMonth = getDaysInMonth(activeDay)
  const firstDayOfActiveMonth = getISODay(new Date(activeYear, activeMonth, 1 ))
  const lastDayOfTheActiveMonth = getISODay(lastDayOfMonth(activeDay))

  const daysOfActiveMonth = eachDayOfInterval({
    start: new Date(activeYear, activeMonth, 1),
    end: new Date(activeYear, activeMonth, daysInActiveMonth)
  })

  const handleNextMonth = () => {
      setActiveDay(addMonths(activeDay, 1))
  }

  const handlePreviousMonth = () => {
    setActiveDay(subMonths(activeDay, 1))
  }

  const handleChoosingDay = (day:Date) => {
    setActiveDay(day)
  }

  const weekdays= ["P", "W", "Ś", "C","P", "S" ,"S"]

  return (
    <div className="w-full shadow-[0px_0px_0px_1px_5px_#CCCCCC30] rounded-xl  border">
      {/* CALENDAR NAVIGATION */}
      <div className="w-full flex items-center items justify-between px-3 py-4">
        {/* MONTH AND YEAR */}
        <h3 className="text-sm text-[#333] font-medium leading-none">{`${format(activeDay, "MMMM")} ${format(activeDay, "y")}`}</h3>
        {/* BUTTONS FOR MONTH NAVIGATION */}
        <div className="flex flex-row gap-2">
          <button 
            className="p-1 bg-[#111] rounded-md border-1 border-[#D4D4D4] hover:bg-[#222]" 
            onClick={handlePreviousMonth}
          >
            <ChevronLeft color="#FFF" size={22} strokeWidth={2} className="pr-0.5"/>
          </button>
          <button 
            className="p-1 bg-[#111] rounded-md border-1 border-[#D4D4D4] hover:bg-[#222]" 
            onClick={handleNextMonth}
          >
            <ChevronRight color="#FFF" size={22} strokeWidth={2} className="pl-0.5"/>
          </button>
        </div> 
      </div>

      {/* CALENDAR CONTENT */}
      <div className="w-full">
        {/* DAY NAMES */}
          <div className="w-full flex items-center justify-evenly py-1">
            {weekdays.map((dayName:string, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="text-center text-xs font-light text-[#111]">{dayName}</div>
              </div>
            ))}
          </div>

          <div className="w-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
            {/* PREVIOUS MONTH DAYS */}
            {Array.from({ length: firstDayOfActiveMonth- 1 }, (i:number) => i + 1).map((_ ,i) => <div key={i}></div>)}
            
            {/* THIS MONTH DAYS */}
            {daysOfActiveMonth.map((day, i) => (
              <div key={i} className="flex flex-col justify-center items-center py-2">
                <div 
                  className={cn("flex justify-center items-center font-semibold h-8 w-8 leading-none rounded-md hover:cursor-pointer",
                  isToday(day) ? "text-[#FF5F57]" : "text-[#333]", 
                  isSameDay(activeDay, day) ? "bg-[#111] text-white font-semibold" : "", 
                  )}
                  onClick={() => handleChoosingDay(day)}
                >
                  {getDate(day)}
                </div>
              </div>
            ))}

            {/* NEXT MONTH DAYS */}
            {Array.from({ length: 7 - lastDayOfTheActiveMonth}, (_, i) => i + 1).map((_ ,i) => <div key={i}></div>)}
          </div>
      </div>
    </div>
  )
}

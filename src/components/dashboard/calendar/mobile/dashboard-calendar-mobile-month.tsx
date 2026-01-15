'use client'
import { addMonths, eachDayOfInterval, format, getDate, getDaysInMonth, getISODay, getMonth, getYear, isSameDay, isToday, lastDayOfMonth, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/utils"
import { useBusinessSmallCallendarStore } from "@/lib/store"
import { pl } from "date-fns/locale";

const weekdays= ["P", "W", "Ś", "C","P", "S" ,"S"]
export const DashboardCalendarMobileMonth = () => {
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

  const handleNextMonth = () => setActiveDay(addMonths(activeDay, 1))
  const handlePreviousMonth = () =>  setActiveDay(subMonths(activeDay, 1))
  const handleChoosingDay = (day:Date) => setActiveDay(day)

  return (
    <div className="w-full shadow-sm rounded-2xl border-[0.5px] border-[#D4D4D4]">
      {/* CALENDAR NAVIGATION */}
      <div className="w-full flex items-center items justify-between px-3 py-4">
        {/* MONTH AND YEAR */}
        <p className="text-sm text-[#191919] font-medium">{`${format(activeDay, "MMMM", {locale: pl})} ${format(activeDay, "y")}`}</p>
        {/* BUTTONS FOR MONTH NAVIGATION */}
        <div className="flex flex-row gap-2">
          <button 
            className="p-1 bg-[#191919] rounded-xl hover:bg-[#2A2A2A] active:scale-95" 
            onClick={handlePreviousMonth}
          >
            <ChevronLeft color="#FFF" size={22} strokeWidth={2} className="pr-0.5"/>
          </button>
          <button 
            className="p-1 bg-[#191919] rounded-xl hover:bg-[#2A2A2A] active:scale-95" 
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
                <div className="text-center text-xs font-light text-[#191919]">{dayName}</div>
              </div>
            ))}
          </div>

          <div className="w-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
            {/* PREVIOUS MONTH DAYS */}
            {Array.from({ length: firstDayOfActiveMonth- 1 }, (i:number) => i + 1).map((_ ,i) => <div key={i}></div>)}
            
            {/* THIS MONTH DAYS */}
            {daysOfActiveMonth.map((day, i) => (
              <div key={i} className="flex flex-col justify-center items-center p-2">
                <div 
                  className={cn("flex justify-center items-center font-semibold h-8 w-8 leading-none rounded-md hover:cursor-pointer hover:bg-[#F2F2F7] active:scale-95",
                  isToday(day) ? "text-[#FF5F57]" : "text-[#191919]", 
                  isSameDay(activeDay, day) ? "bg-[#191919] text-white font-semibold hover:bg-[#191919]" : "", 
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

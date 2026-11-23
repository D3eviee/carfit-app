"use client"
import { getDate, isBefore, isSameDay, isToday, startOfDay } from "date-fns"
import { useAppointmentStore, useCalendarStore } from "@/lib/store"
import { cn } from "@/utils"

export const BookingCalendarDay = ({ date }: { date: Date }) => {
  const selectedDate = useCalendarStore((store) => store.selectedDate)
  const todayDate = useCalendarStore((store) => store.todayDate)
  const setSelectedDate = useCalendarStore((store) => store.setSelectedDate)
  const setAppointmentTime = useAppointmentStore((store) => store.setAppointmentTime)

  const isSelected = selectedDate ? isSameDay(selectedDate, date) : false
  const isPast = isBefore(date, startOfDay(todayDate))
  
  const handleSelect = () => {
    setSelectedDate(date)
    setAppointmentTime(null) // a time picked on another day must not carry over
  }
  
  return (
    <div className="flex justify-center text-center p-1.5">
      <button
        type="button"
        disabled={isPast}
        aria-pressed={isSelected}
        onClick={handleSelect}
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-md text-base text-[#191919] font-normal hover:cursor-pointer",
          isToday(date) ? "border-[0.5px] border-[#333]" : "border-none",
          isSelected ? "bg-black text-white" : "bg-none",
          isPast ? "hover:cursor-default line-through" : "no-underline"
        )}
      >
        {getDate(date)}
      </button>
    </div>
    )
}
'use client'
import { eachDayOfInterval, endOfMonth, format, getISODay, isSameMonth, startOfMonth } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookingCalendarDay } from "./BookingCalendarDay";
import { useAppointmentStore, useCalendarStore } from "@/lib/store";
import { cn } from "@/utils";
import { BookingAppointmentAvailableHours } from "./BookingAppointmentAvailableHours";
import { Service } from "@/lib/types";
import { Spinner } from "../spinner";
import { pl } from "date-fns/locale";
import { useAppointmentForMonth } from "@/lib/hooks/client/useBookingAppointmentsForMonth";
import { useBookingWokingHours } from "@/lib/hooks/client/useBookingWorkingHours";
import { Error as ErrorState } from "../error"

const NAMES_OF_DAYS = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"]
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

type BookingCalendarProps = {
  servicesData: Service[]
  businessId: string
}


export const BookingCalendar = ({ servicesData, businessId }: BookingCalendarProps) => {
  // Calendar store 
  const todayDate = useCalendarStore((store) => store.todayDate)
  const activeDate = useCalendarStore((store) => store.activeDate)
  const selectedDate = useCalendarStore((store) => store.selectedDate) // selected appointment date
  const setNextActiveMonth = useCalendarStore((store) => store.setNextActiveMonth)
  const setPreviousActiveMonth = useCalendarStore((store) => store.setPreviousActiveMonth)
  const setAppointmentTime = useAppointmentStore((store) => store.setAppointmentTime)


  const { data: monthReservations, status: reservationsStatus } = useAppointmentForMonth(activeDate, businessId)
  const { data: workingHours, status: workingHoursStatus } = useBookingWokingHours(businessId)

  if (reservationsStatus === "pending" || workingHoursStatus === "pending") return <Spinner />
  if (reservationsStatus === "error" || workingHoursStatus === "error") return <ErrorState />
  
  // Calendar grid for the displayed month
  const monthStart = startOfMonth(activeDate)
  const monthEnd = endOfMonth(activeDate)
  const daysOfActiveMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const leadingBlanks = getISODay(monthStart) - 1
  const trailingBlanks = 7 - getISODay(monthEnd)

  const activeMonthLabel = `${capitalize(format(activeDate, "LLLL", { locale: pl }))}, ${activeDate.getFullYear()}`
  const selectedDateLabel = selectedDate ? capitalize(format(selectedDate, "EEEE, d MMMM y", { locale: pl })) : "Wybierz dzień"

  const isPreviousMonthDisabled = isSameMonth(todayDate, activeDate)
  
  const handlePreviousMonth = () => {
    setPreviousActiveMonth(activeDate)
    setAppointmentTime(null)
  }
    
  const handleNextMonth = () => {
    setNextActiveMonth(activeDate)
    setAppointmentTime(null)
  }


  return (
    <div className="h-screen w-full flex flex-col gap-4 overflow-hidden lg:gap-6">
      <h1 className="text-[#191919] text-xl leading-none font-bold">Wybierz termin</h1>
      
      {/* CALENDAR HEADING AND CONTROLS */}
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-black text-base font-medium tracking-normal">{activeMonthLabel}</h2>
        <div className="flex flex-row gap-3">
          <button
            type="button"
            aria-label="Poprzedni miesiąc"
            className={cn("p-1 bg-black rounded-md hover:bg-[#222]", isPreviousMonthDisabled && "bg-[#333] hover:bg-[#333]")}
            disabled={isPreviousMonthDisabled}
            onClick={handlePreviousMonth}
          >
            <ChevronLeft size={23} color="#FFF" />
          </button>
          <button type="button" aria-label="Następny miesiąc" className="p-1 bg-black rounded-md hover:bg-[#222]" onClick={handleNextMonth}>
            <ChevronRight size={23} color="#FFF" />
          </button>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="flex flex-col w-full">
        {/* DAYS NAMES */}
        <div className="w-full grid grid-cols-7">
          {NAMES_OF_DAYS.map((day) =>  <div key={day} className="text-xs text-center pb-0.5">{day}</div> )}
        </div>

        {/* DAYS FOR SELECTING */}

        <div className="w-full grid grid-cols-7">
          {Array.from({ length: leadingBlanks }, (_, i) => (
            <div key={`lead-${i}`} className="flex justify-center text-center py-0.5 my-0.5" />
          ))}

          {daysOfActiveMonth.map((day) => (
            <BookingCalendarDay key={day.toISOString()} date={day} />
          ))}

          {Array.from({ length: trailingBlanks }, (_, i) => (
            <div key={`trail-${i}`} className="flex justify-center text-center py-0.5 my-0.5" />
          ))}
        </div>
      </div>
      
      {/* AVAILABLE HOURS */}
      <div className="w-full h-full flex flex-col gap-2 overflow-scroll lg:mt-5">
        <h2 className="px-1 text-middle font-medium text-main-black">{selectedDateLabel}</h2>
        {selectedDate && 
          <BookingAppointmentAvailableHours 
            services={servicesData} 
            reservations={monthReservations} 
            workingHours={workingHours} 
          /> 
        }
      </div>
    </div>
  )
} 
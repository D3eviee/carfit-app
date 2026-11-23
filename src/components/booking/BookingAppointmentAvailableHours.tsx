
"use client"
import { getISODay } from "date-fns"
import { useAppointmentStore, useCalendarStore } from "@/lib/store"
import { BookingReservationData, Service, WorkingDay } from "@/lib/types"
import { getAvailableSlots, getBookingTotals } from "@/lib/booking"
import { DAYS_OF_WEEK } from "@/utils"
import { BookingEventTimeItem } from "./booking-event-time-item"

type BookingAppointmentAvailableHoursProps = {
    services: Service[]
    reservations: BookingReservationData[]
    workingHours: WorkingDay[]
}

const messageClass = "h-20 flex justify-center items-center text-center text-sm text-[#373737] font-normal"

export const BookingAppointmentAvailableHours = ({ services, reservations, workingHours }: BookingAppointmentAvailableHoursProps) => {
  const selectedDate = useCalendarStore((store) => store.selectedDate)
  const selectedServices = useAppointmentStore((store) => store.selectedServices)

  if (!selectedDate) return null

  const dayData = workingHours.find((day) => day.dayOfWeek === DAYS_OF_WEEK[getISODay(selectedDate) - 1])
  const { totalDuration } = getBookingTotals(services, selectedServices)
  
  const slots = dayData?.isOpen
    ? getAvailableSlots({
      date: selectedDate,
      open: dayData.open,
      close: dayData.close,
      duration: totalDuration,
      reservations,
    })
    : []

  return (
    <div className="w-full max-h-34 overflow-scroll p-0.5 md:max-h-full">
      {!dayData?.isOpen 
        ? <p className={messageClass}>Warsztat nieczynny. Wybierz inny termin.</p>
        : slots.length === 0 
          ? <p className={messageClass}>Brak wolnych terminów. Wybierz inny dzień.</p>
          : (
            <div className="w-full grid grid-cols-5 md:grid-cols-9 gap-3">
              {slots.map((time) => <BookingEventTimeItem key={time.toISOString()} time={time} /> )}
            </div>
          )
      }
    </div>
  )
}
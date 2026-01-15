'use client'
import { BookingEventTimeItem } from "./booking-event-time-item"
import { useAppointmentStore, useCalendarStore } from "@/lib/store"
import { addMinutes, eachMinuteOfInterval, format, set, } from "date-fns"
import { BookingReservationData, Service, WorkingDay } from "@/lib/types"
import { pl } from "date-fns/locale"

type BookingAppointmentAvailableHoursProps = {
    services: Service[]
    reservations: BookingReservationData[]
    workingHours: WorkingDay[]
}

export const BookingAppointmentAvailableHours = ({services, reservations, workingHours}:BookingAppointmentAvailableHoursProps) => {
    const selecetedDate = useCalendarStore((store) => store.selectedDate)
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    const selectedDateDayOfWeek = format(selecetedDate, "iiii", {locale: pl})
    const selectedDateDayOfWeekFormatted = selectedDateDayOfWeek[0].toUpperCase() + selectedDateDayOfWeek.slice(1)


    const selectedServicesTotalDuration = services?.reduce((sum, item) => {
        return selectedServices.includes(item.id)
            ? sum + Number(item.duration)
            : sum
    }, 0) || 0;

    const activeDayOpeningData = workingHours.find((day) => day.dayOfWeek == selectedDateDayOfWeekFormatted)

    const [serviceOpeningHour, serviceOpeningMinutes] = activeDayOpeningData.open.split(":")
    const [serviceClosingHour, serviceClosingMinutes] = activeDayOpeningData.close.split(":")
    const openingServiceTime = set(new Date(selecetedDate!), { hours: Number(serviceOpeningHour), minutes: Number(serviceOpeningMinutes), seconds: 0})
    const closingServiceTime = set(new Date(selecetedDate!), { hours: Number(serviceClosingHour), minutes: Number(serviceClosingMinutes), seconds: 0 })
    const hours = eachMinuteOfInterval({start: openingServiceTime, end: closingServiceTime}, {step:15})
    const isAvaliabe = []

    return (
        <div className="w-full max-h-34 overflow-scroll p-0.5 md:max-h-full">
            {activeDayOpeningData?.isOpen ? (
                <div className="w-full grid grid-cols-5 md:grid-cols-9 gap-3">
                    {hours.map((time, index) => {
                        const isReserved = reservations.some((item) => time >= item.reservationStart && time < item.reservationEnd);
                        if (isReserved) return null;

                        else {
                            const serviceDuration = selectedServicesTotalDuration
                            const serviceEnd = addMinutes(time, serviceDuration)

                            const isBetween = reservations.some((item) => time < item.reservationEnd && serviceEnd > item.reservationStart)
                            if(isBetween) return null

                            isAvaliabe.push(addMinutes(time, serviceDuration) > closingServiceTime)
                            if(!isAvaliabe[index]) return <BookingEventTimeItem time={time} key={index}/>
                        }
                    })}
                </div>
            ) 
            : <p className="h-20 flex justify-center items-center text-center text-sm text-[#373737] font-normal">Warsztat nieczynny. Wybierz inny termin.</p>
            }
        </div>
    )
}
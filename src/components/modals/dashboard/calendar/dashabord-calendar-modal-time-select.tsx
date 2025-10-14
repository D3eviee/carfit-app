'use client'
import { Error } from "@/components/error"
import { FormError } from "@/components/forms/form-error"
import { DashboardCalendarModalLabel } from "@/components/modals/dashboard/calendar/dashboard-calendar-modal-label"
import { Spinner } from "@/components/spinner"
import { useCalendarSelectedDateAppointments } from "@/lib/hooks/dashboard/useCalendarSelectedDateAppointments"
import { AddNewAppointmentManual } from "@/lib/schema"
import { addMinutes, eachMinuteOfInterval, format, set } from "date-fns"
import { pl } from "date-fns/locale"
import { UseFormRegister } from "react-hook-form"

type DashboardCalendarModalTimeSelectProps = {
  workingHoursData:{
    dayOfWeek: string
    open: string
    isOpen: boolean
    close: string
  }[]
  register: UseFormRegister<AddNewAppointmentManual>
  selectedDate: string
  selectedServiceDuration: number
  error: string
}

export const DashboardCalendarModalTimeSelect = ({workingHoursData, selectedDate, register, selectedServiceDuration, error}:DashboardCalendarModalTimeSelectProps) => {
  const { data: appointments, status: appointmentsStatus} = useCalendarSelectedDateAppointments(selectedDate)

  const selectedDayOfWeek = format(new Date(selectedDate), "iiii", {locale: pl})
  const selectedDayOfWeekFormatted = selectedDayOfWeek[0].toUpperCase() + selectedDayOfWeek.slice(1)
  const activeDayOpeningData = workingHoursData.find((day) => day.dayOfWeek == selectedDayOfWeekFormatted)
  const [serviceOpeningHour, serviceOpeningMinutes] = (activeDayOpeningData?.open ?? "06:00").split(":");
  const [serviceClosingHour, serviceClosingMinutes] =  (activeDayOpeningData?.close ?? "06:00").split(":");
  const openingServiceTime = set(new Date(selectedDate), { hours: Number(serviceOpeningHour), minutes: Number(serviceOpeningMinutes), seconds: 0})
  const closingServiceTime = set(new Date(selectedDate), { hours: Number(serviceClosingHour), minutes: Number(serviceClosingMinutes), seconds: 0 })
  const hours = eachMinuteOfInterval({start: openingServiceTime, end: closingServiceTime}, {step:15})

  if (appointmentsStatus === "pending") return <Spinner/>
  if (appointmentsStatus === "error") return <Error/>

  return (
    <div className="w-1/3 flex flex-col gap-2">
      <DashboardCalendarModalLabel htmlFor="time" labelText="Godzina"/>
      <select 
        className="w-full bg-[#F6F7FB] px-2 py-2.5 text-sm text-main-black rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]" 
        id="time" 
        {...register('time')} 
        required
      >
        <option value="" disabled hidden>Wybierz godzinę</option>
        {hours.map((time, index) => {
          const isReserved = appointments?.some((item) => time >= item.reservationStart && time < item.reservationEnd)
          
          if (isReserved) return null
          else{
            const serviceEnd = addMinutes(time, Number(selectedServiceDuration))
            const isBetween = appointments!.some((item) =>time < item.reservationEnd && serviceEnd > item.reservationStart)
            
            if(isBetween) return null
            const afterWorkingHours = addMinutes(time, selectedServiceDuration) > closingServiceTime

            if(afterWorkingHours) return null
            return <option key={index} value={String(time)}>{`${format(time, "HH")}:${format(time, "mm")}`}</option>
          }
        })}
      </select>
      <FormError error={error}/>
    </div>
  )
}
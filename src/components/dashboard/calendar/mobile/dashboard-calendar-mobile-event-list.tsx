'use client'
import { useBusinessSmallCallendarStore } from "@/lib/store";
import { eachDayOfInterval, isSameDay, lastDayOfISOWeek, startOfISOWeek } from "date-fns";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { DashboardCalendarEventListItem } from "../dashboard-calendar-event-list-item";
import { useAppointmentForWeek } from "@/lib/hooks/dashboard/useAppointmentsForWeek";

export const DashboardCalendarMobileEventList =() => {
  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)

  // we are gonna fetch data for all the weekend for beter performance's 
  const currentWeekInterval: Date[] = eachDayOfInterval({
    start: startOfISOWeek(activeDay),
    end: lastDayOfISOWeek(activeDay),
  })

  const { data: weeklyAppointmentsData, status:weeklyAppointmentsStatus } = useAppointmentForWeek(currentWeekInterval)
  if(weeklyAppointmentsStatus == "pending") return <Spinner/>
  if(weeklyAppointmentsStatus == "error") return <Error/>

  const activeDayAppointments = weeklyAppointmentsData
    .filter(day => isSameDay(day.reservationStart, activeDay))
    .sort((a, b) => a.reservationStart.getTime() - b.reservationStart.getTime())

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll overflow-hidden min-h-0  overflow-x-hidden">
      {activeDayAppointments.length > 0 
        ? activeDayAppointments.map((appointment, index) => <DashboardCalendarEventListItem key={index} appointmentData={appointment}/> )
        : <p className="py-5 text-sm text-[#333] text-center font-normal">Brak wizyt</p>
      }
    </div>
  )
}
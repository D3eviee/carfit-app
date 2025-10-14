
'use client'
import { useBusinessSmallCallendarStore } from "@/lib/store";
import { eachDayOfInterval, isSameDay, lastDayOfISOWeek, startOfISOWeek } from "date-fns";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { DashboardCalendarEventListItem } from "../dashboard-calendar-event-list-item";
import { useCalendarWeekIntervalAppointments } from "@/lib/hooks/dashboard/useCalendarWeekIntervalAppointments";

export const DashboardCalendarSecondaryAppointmentList = () => {
  // get currently marked day
  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)

  // we are gonna fetch data for all the weekend for beter performance's 
  const currentWeekInterval: Date[] = eachDayOfInterval({
    start: startOfISOWeek(activeDay),
    end: lastDayOfISOWeek(activeDay),
  })
  const {data: weeklyAppointmentsData, status} = useCalendarWeekIntervalAppointments(currentWeekInterval)

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  const activeDayAppointments = weeklyAppointmentsData
    .filter(day => isSameDay(day.reservationStart, activeDay))
    .sort((a, b) => a.reservationStart.getTime() - b.reservationStart.getTime())

  return (
    <div className="h-full w-full px-2 py-3 border-1 border-[#E6E6E6] rounded-3xl overflow-x-hidden">
      <div className="flex flex-col w-full h-full overflow-y-scroll overflow-hidden min-h-0 overflow-x-hidden">
        {activeDayAppointments.length > 0 
          ? activeDayAppointments.map((appointment, index) => <DashboardCalendarEventListItem key={index} appointmentData={appointment}/>) 
          : <p className="h-full flex justify-center items-center text-sm text-main-black font-light">Brak wizyt w tym dniu</p>
        }
      </div>
    </div>
  )
}

'use client'
import { useBusinessSmallCallendarStore } from "@/lib/store";
import CalendarEventListItem from "./calendar-event-list-item";
import { eachDayOfInterval, isSameDay, lastDayOfISOWeek, startOfISOWeek } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsForWeekInterval } from "@/app/dashboard/calendar/actions";
import { useState } from "react";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { CalendarAppointmentOverviewProps } from "@/lib/types";
import CalendarEventModal from "./calendar-event-modal";

export default function CalendarEventList() {
  //state for opening overview modal 
  const [isOpen, setIsOpen] = useState(false)
  const [overviewData, setOverviewData] = useState<CalendarAppointmentOverviewProps>({
    appointmentId: "",
    clientPhone: "",
    clientName: "",
    clientImage: "",
    duration: 120,
    reservationStart: new Date(),
    charge: 0,
    service: [],
    status:""
  })

  // get currently marked day
  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)

  // we are gonna fetch data for all the weekend for beter performance's 
  const currentWeekInterval: Date[] = eachDayOfInterval({
    start: startOfISOWeek(activeDay),
    end: lastDayOfISOWeek(activeDay),
  })

  const { data: weeklyAppointmentsData, status:weeklyAppointmentsStatus } = useQuery({
    queryKey:['getAppointmentsForWeekInterval ', currentWeekInterval],
    queryFn: async () => {
      const response = await getAppointmentsForWeekInterval(currentWeekInterval);
      if(!response.success) return null 
      return response.data
    }
  })

  if(weeklyAppointmentsStatus == "pending") return <Spinner/>
  if(weeklyAppointmentsStatus == "error") return <Error/>

  const activeDayAppointments = weeklyAppointmentsData
    .filter(day => isSameDay(day.reservationStart, activeDay))
    .sort((a, b) => a.reservationStart.getTime() - b.reservationStart.getTime())

  const openOverview = (data:CalendarAppointmentOverviewProps) => {
    setOverviewData(data)
    setIsOpen(true)
  }

  return (
    <div className="w-full overflox-x-hidden">
      <div className="flex flex-col w-full h-full overflow-y-scroll overflow-hidden min-h-0  overflow-x-hidden">
        {activeDayAppointments.length >  0 ? activeDayAppointments.map((appointment, index) => 
          <CalendarEventListItem 
            openModal={() => openOverview(appointment)}
            closeModal={() => {setIsOpen(false)}}
            key={index} 
            appointmentData={appointment}
          />
        ) : <p className="py-5 text-sm text-[#333] text-center font-normal">Brak wizyt</p>
        }
      </div>

      {/* MODAL FOR EVENT OVERVIEW */}
      <CalendarEventModal appointmentData={overviewData} onClose={() => {setIsOpen(false)}} open={isOpen}/>
    </div>
  );
}
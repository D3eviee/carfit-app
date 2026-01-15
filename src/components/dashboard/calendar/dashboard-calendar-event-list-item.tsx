'use client'
import { DashboardAppointmentDetailsModal } from "@/components/modals/dashboard/appointment-details/dashboard-appointment-details-modal"
import { useModalStore } from "@/lib/store"
import { CalendarAppointmentOverviewProps } from "@/lib/types"
import { cn } from "@/utils"
import { addMinutes, format } from "date-fns"

export const DashboardCalendarEventListItem = ({appointmentData}:{appointmentData:CalendarAppointmentOverviewProps}) => {
  const {status, reservationStart, duration, service} = appointmentData
  const openModal = useModalStore(store => store.openModal)

  // FORMATING FOR DISPLAYING TITLE, COLOR LABELS AND HOURS
  const eventEnd = addMinutes(reservationStart, duration)
  const eventStartFormated = `${format(reservationStart, 'kk')}:${format(reservationStart, 'mm')}`
  const eventEndFormated = `${format(eventEnd, 'kk')}:${format(eventEnd, 'mm')}`
  const appointmentTitle = service.length == 1 ? `${service[0].name}` : service.length == 2 ? `${service[0].name} i 1 inna usługi` : `${service[0].name} i ${service.length-1} inne usługi`
  const statusColor = (status == "finished") ? "#1E6EF3" : "#35C759"

  const handleOpeningDetailsModal = () => openModal(<DashboardAppointmentDetailsModal appointmentData={appointmentData}/>)

  return (
    <div 
      onClick={handleOpeningDetailsModal}
      className="w-full flex flex-row items-center gap-3 p-2 py-3 rounded-2xl hover:cursor-pointer hover:bg-[#F2F2F7]"
    >
      <div className={cn("w-1.5 h-1.5 rounded-full", `bg-[${statusColor}]`)}/>
      <div className="flex flex-col gap-2">
        <p className="text-middle text-main-black font-medium leading-5">{appointmentTitle}</p>
        <p className="text-sm text-main-black font-light leading-none">{eventStartFormated} - {eventEndFormated}</p>
      </div>
    </div>    
  );
}
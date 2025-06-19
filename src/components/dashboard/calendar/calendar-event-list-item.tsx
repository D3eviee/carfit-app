'use client'
import { CalendarAppointmentOverviewProps } from "@/lib/types";
import { cn } from "@/utils";
import { addMinutes, format } from "date-fns";

type CalendarEventListItemProps = {
  openModal: () => void
  closeModal: () => void
  appointmentData : CalendarAppointmentOverviewProps
}

export default function CalendarEventListItem({openModal, closeModal, appointmentData}:CalendarEventListItemProps) {
  const eventEnd = addMinutes(appointmentData.reservationStart, appointmentData.duration)
  const eventStartFormated = `${format(appointmentData.reservationStart, 'kk')}:${format(appointmentData.reservationStart, 'mm')}`
  const eventEndFormated = `${format(eventEnd, 'kk')}:${format(eventEnd, 'mm')}`

  const handleOpeningModal = () => {
    document.body.style.overflow = "hidden"
    openModal()
  }
  
  return (
    <div 
      className="w-full p-2.5 flex flex-row justify-between items-center border-b border-b-[#F2F2F2] hover:cursor-pointer"
      onClick={handleOpeningModal}
    >
        <div className="relative flex flex-row gap-2 items-center">
          <div className={cn("w-1.5 h-1.5 rounded-full", 
            appointmentData.status == "Odwołana" && "bg-[#FF5F58]",
            appointmentData.status == "Oczekująca" && "bg-[#FDBC2C]",
            appointmentData.status == "Zarezerwowana" && "bg-[#28C840]",
          )}/>

          <div className="flex flex-col gap-1.5">
            {appointmentData.service.map((service, index) => (
            <h1 key={index} className="text-md text-[#111] font-medium leading-none">{service.name}</h1>))}
          </div>
      </div>
      <p className="text-sm font-normal leading-none">{eventStartFormated} - {eventEndFormated}</p>
    </div>    
  );
}
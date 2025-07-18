'use client'
import { createPortal } from "react-dom";
import { CalendarAppointmentOverviewProps } from "@/lib/types";
import { addMinutes, format } from "date-fns";
import { pl } from "date-fns/locale";
import { X } from "lucide-react";
import Image from "next/image";
import CalendarEventOverviewCancelButton from "./calendar-event-overview-cancel-button";

type CalendarEventModalProps = {
  open: boolean
  onClose: () => void
  appointmentData : CalendarAppointmentOverviewProps
}

export default function CalendarEventModal({ open, onClose, appointmentData}: CalendarEventModalProps) {
  const rawShortAppointmentMonth = format(appointmentData.reservationStart, "LLL", { locale: pl })
  const shortAppointmentMonth = rawShortAppointmentMonth.charAt(0).toUpperCase() + rawShortAppointmentMonth.slice(1)

  const rawDayOfWeek = format(appointmentData.reservationStart, "EEEE", { locale: pl })
  const dayOfWeek = rawDayOfWeek.charAt(0).toUpperCase() + rawDayOfWeek.slice(1)
  const appointmentDayOfMonth = format(appointmentData.reservationStart, "d", { locale: pl })
  const appointmentYear = format(appointmentData.reservationStart, "y")
  const fullDate = `${dayOfWeek}, ${appointmentDayOfMonth} ${shortAppointmentMonth} ${appointmentYear}` 

  // helpers for appointment time
  const appointmentEndTime = addMinutes(appointmentData.reservationStart, appointmentData.duration)
  const formattedAppointmentStart = `${format(appointmentData.reservationStart, 'kk')}:${format(appointmentData.reservationStart, 'mm')}`
  const formattedAppointmentEnd = `${format(appointmentEndTime, 'kk')}:${format(appointmentEndTime, 'mm')}`
  const fullTime = `${formattedAppointmentStart} - ${formattedAppointmentEnd}`

  if(!open) return null

  return createPortal(
    <div className="w-full h-lvh fixed top-0 right-0 z-10 ">
      {/* black bg div */}
      <div  className="w-full h-full bg-black opacity-60"/>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl min-h-[80%] min-w-96 max-w-96 z-20">
        {/* TOP NAVIGATION */}
        <div className="w-full flex flex-row justify-between">
          {/* Back button */}
          <div className="w-fit flex flex-row items-center p-2 rounded-full bg-[#111] hover:cursor-pointer hover:bg-[#000]" onClick={onClose}>
            <X size={20} strokeWidth={2} color="white" className="w-fit"/>
          </div>
          {/* Edit button */}
          <div className="px-4 py-2 rounded-full bg-[#111] hover:cursor-wait hover:bg-[#000]">
            <p className="text-sm text-[#FFF] font-semibold">Edytuj</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-full flex flex-col gap-6 py-10">
          {/* TITLE DATE AND STATUS SECTION*/}
          <div className="w-full flex flex-col gap-4 px-5">
            {/* TITLE */}
            <div className="flex flex-col gap-1">
              {appointmentData.service.map((service, index) => <h1 key={index} className="text-lg text-[#111] font-medium leading-none">{service.name}</h1>)}
            </div>
            {/* SERVICES DATE */}
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-[#333] font-normal">{fullDate}</p>
              <p className="text-sm text-[#333] font-normal">{fullTime}</p>
            </div>
            {/* EVENT STATUS */}
            {appointmentData.status == "Odwołana" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#FF5F58]">{appointmentData.status}</p>}
            {appointmentData.status  == "Oczekująca" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#FDBC2C]">{appointmentData.status}</p>}
            {appointmentData.status  == "Zarezerwowana" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#28C840]">{appointmentData.status}</p>}
          </div>
        
          {/* CUSTOMER DATA SECTION*/}
          <div className="flex flex-col gap-2 p-4 bg-[#F2F4F8] rounded-lg border-[0.5px] border-[#C3C8CF]">
            {/* Image and name */}
            <div className="flex flex-row gap-2 items-center">
              <div className="relative w-10 h-10 rounded-full overflow-clip border box-content">
                <Image
                  alt="user image"
                  src="https://carfitapp.s3.eu-north-1.amazonaws.com/UserProfilePhotos/93aea99b-d323-439d-b097-4434a03208c6/5c1f3ebf-8fa4-462c-8e6f-8d23da5b83f7" 
                  fill
                />
              </div>
              <p className="text-base text-[#000] font-normal">{appointmentData.clientName}</p>
            </div>
            {/* phone */}
            <div className="px-1 flex flex-row justify-between">
              <p className="text-sm text-[#111] font-normal">Phone</p>
              <p className="text-sm text-[#111] font-light">+48 {appointmentData.clientPhone}</p>
            </div>
          </div>
        
          {/* SERVICES DATA*/}
          <div className="flex flex-col gap-2 p-4 bg-[#F2F4F8] rounded-lg border-[0.5px] border-[#C3C8CF]">
            {appointmentData.service.map((service, index) => (
              <div key={index} className="px-1 flex flex-row justify-between">
                <p className="text-sm text-[#111] font-normal">{service.name}</p>
                <p className="text-sm text-[#111] font-light">{service.price} PLN</p>
              </div>
            ))}
            <hr className="h-[1px] w-full bg-[#D4D4D4]"/>
            {/* Total */}
            <div className="px-1 flex flex-row justify-between">
              <p className="text-sm text-[#111] font-medium">Suma</p>
              <p className="text-sm text-[#111] font-medium">{appointmentData.charge} PLN</p>
            </div>
          </div>

          {/* DELETE BUTTON */}
          <CalendarEventOverviewCancelButton appointmentId={appointmentData.appointmentId} parentOnClose={onClose}/>
        </div>
      </div>
    </div>,
    document.body
  )
}


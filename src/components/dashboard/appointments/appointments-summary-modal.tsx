'use client'
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { CalendarAppointmentOverviewProps } from "@/lib/types";
import { addMinutes, format } from "date-fns";
import { pl } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import AppointmentsSumarryCancelButton from "./appointments-summary-cancel-button";

type AppointmentsSumarryModalProps = {
  open: boolean 
  onClose: () => void
  appointmentData : CalendarAppointmentOverviewProps 
}

export default function AppointmentsSumarryModal({ open, onClose, appointmentData = {
    appointmentId: "",
    charge: 0,
    clientImage: "",
    clientName: "",
    clientPhone: "",
    duration: 0,
    service: [],
    reservationStart: new Date(),
    status: ""
  }}: AppointmentsSumarryModalProps) {
  // helpers for appointment date 
  const rawMonth = format(appointmentData.reservationStart, "LLLL", { locale: pl })
  const appointmentMonth = rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1)

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

  return createPortal(
    <div 
      className={cn("fixed top-0 right-0 w-full h-lvh bg-[#fdfcff] z-10 p-4 transition-transform duration-220 ease-in-out overflow-x-hidden",
      open ? "translate-x-0" : "translate-x-full"
    )}
    >
      {/* TOP NAVIGATION */}
      <div className="w-full flex flex-row justify-between">
         {/* Back button */}
        <div 
          className="w-fit flex flex-row items-center p-2  rounded-full bg-[#111]"
          onClick={onClose}
        >
          <ChevronLeft size={20} strokeWidth={2} color="white" className="w-fit"/>
          <p className="text-sm text-[#FFF] font-medium pr-1">{appointmentMonth}</p>
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
          )) }
          <hr className="h-[1px] w-full bg-[#D4D4D4]"/>
          {/* Total */}
          <div className="px-1 flex flex-row justify-between">
            <p className="text-sm text-[#111] font-medium">Suma</p>
            <p className="text-sm text-[#111] font-medium">{appointmentData.charge} PLN</p>
          </div>
        </div>
      </div>

      {appointmentData.status == "Zarezerwowane" && <AppointmentsSumarryCancelButton appointmentId={appointmentData.appointmentId} parentOnClose={onClose}/>}
    </div>,
    document.body
  );
}


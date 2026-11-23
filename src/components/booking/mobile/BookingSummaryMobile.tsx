'use client'
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { Calendar, Car, Clock } from "lucide-react"
import { Service } from "@/lib/types"
import { useAppointmentStore } from "@/lib/store"
import { getBookingTotals } from "@/lib/booking"
import { displayAppointmentTime } from "@/utils"
import { BookingButtonBookAppointment } from "../BookingButtonBookAppointment";
import { BookingSummaryItem } from "../BookingSummaryItem"

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

type BookingSummaryMobileProps = {
  services: Service[]
  bookingStep: number
  businessId: string
}

export const BookingSummaryMobile = ({ services, bookingStep, businessId }: BookingSummaryMobileProps) => {
  // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
  const selectedServices = useAppointmentStore((store) => store.selectedServices)
  const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
  const clientMessage = useAppointmentStore((store) => store.clientMessage)
  const clientCar = useAppointmentStore((store) => store.clientCar)

  const { selected, totalPrice, totalDuration } = getBookingTotals(services, selectedServices)
  
  return (
    <div className="w-full flex flex-col gap-5 lg:hidden">
      <h1 className="text-[#191919] text-2xl leading-none font-semibold">Podsumowanie wizyty</h1>

      <div className="w-full flex flex-col px-5 py-8 gap-3 ring-2 ring-[#F2F2F2] rounded-xl">
        {/* APPOINTMENT DATE AND TIME */}
        {appointmentTime && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
              <Calendar size={23} color="#555" strokeWidth={1.5} />
              <p className="font-normal text-[#555] text-sm">{capitalize(format(appointmentTime, "cccc d MMMM", { locale: pl }))}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Clock size={23} color="#555" strokeWidth={1.5} />
              <p className="font-normal text-[#555] text-sm">{format(appointmentTime, "HH:mm")} ({displayAppointmentTime(totalDuration)})</p>
            </div>
            {clientCar && (
              <div className="flex flex-row gap-2 items-center">
                <Car size={23} color="#555" strokeWidth={1.5} />
                <p className="font-normal text-[#555] text-sm">{clientCar}</p>
              </div>
            )}
          </div>
        )}
        
        <hr className="w-full border-1 border-[#F2F2F7]" />
        
        {/* MESSAGE FROM CLIENT */}
        {clientMessage.trim().length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-normal text-black px-1 whitespace-pre-line">{clientMessage}</p>
            <hr className="w-full border-1 border-[#F2F2F7]"/>
          </div>
        )}  
      

        {selected.map((item) => <BookingSummaryItem key={item.id} serviceData={item} activeBookingStep={bookingStep} resetBookingProcess={() => {}} /> )}

        <hr className="w-full border-1 border-[#F2F2F7]" />
        <div className="w-full flex flex-row justify-between px-1">
          <p className="text-sm text-[#191919] font-semibold">Razem</p>
          <p className="text-sm text-[#191919] font-semibold">{totalPrice} PLN</p>
        </div>
      </div>

      <BookingButtonBookAppointment businessId={businessId} />
    </div>
  )
}
"use client"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { Calendar, Car, Clock } from "lucide-react"
import { Service } from "@/lib/types"
import { useAppointmentStore } from "@/lib/store"
import { getBookingTotals } from "@/lib/booking"
import { displayAppointmentTime } from "@/utils"
import { BookingButtonBookAppointment } from "../BookingButtonBookAppointment"
import { BookingSummaryItem } from "../BookingSummaryItem"
import { BookingButtonNextStep } from "../BookingButtonNextStep"

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

type BookingSummaryProps = {
  services: Service[]
  bookingStep: number
  businessId: string
  setNextBookingStep: () => void
  resetBookingProcess: () => void
}

export const BookingSummary = ({ services, bookingStep, businessId, setNextBookingStep, resetBookingProcess }: BookingSummaryProps) => {
  // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
  const selectedServices = useAppointmentStore((store) => store.selectedServices)
  const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
  const clientMessage = useAppointmentStore((store) => store.clientMessage)
  const clientCar = useAppointmentStore((store) => store.clientCar)

  const { selected, totalPrice, totalDuration } = getBookingTotals(services, selectedServices)
  
  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-main-black text-2xl leading-none font-semibold">Podsumowanie wizyty</h1>
      {selected.length > 0 ? (
        <div className="w-full flex flex-col px-5 py-8 gap-3 ring-[0.5px] ring-[#D4D4D4] rounded-3xl">
          {/* APPOINTMENT DATE AND TIME */}
          {appointmentTime && (
            <>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-2 items-center">
                  <Calendar size={23} color="#555" strokeWidth={1.5} />
                  <p className="font-normal text-[#555] text-sm">{capitalize(format(appointmentTime, "cccc d MMMM", { locale: pl }))}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Clock size={23} color="#555" strokeWidth={1.5} />
                  <p className="font-normal text-[#555] text-sm">
                    {format(appointmentTime, "HH:mm")} ({displayAppointmentTime(totalDuration)})
                  </p>
                </div>
                {clientCar && (
                  <div className="flex flex-row gap-2 items-center">
                    <Car size={24} color="#555" strokeWidth={1.5} />
                    <p className="font-normal text-[#555] text-sm">{clientCar}</p>
                  </div>
                )}
              </div>
              <hr className="w-full border-1 border-[#F2F2F7]" />
            </>
          )}
          
          {/* MESSAGE FROM CLIENT */}
          {clientMessage.trim().length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-normal text-main-black px-1 whitespace-pre-line">{clientMessage}</p>
              <hr className="w-full border-1 border-[#F2F2F7]" />
            </div>
          )}

          {selected.map((item) => (
            <BookingSummaryItem
              key={item.id}
              serviceData={item}
              activeBookingStep={bookingStep}
              resetBookingProcess={resetBookingProcess}
            />
          ))}

          <hr className="w-full border-1 border-[#F2F2F7]"/>
          <div className="w-full flex flex-row justify-between px-1">
            <p className="text-sm text-[#191919] font-semibold">Razem</p>
            <p className="text-sm text-[#191919] font-semibold">{totalPrice} PLN</p>
          </div>
        </div>
        ): 
        <div className="w-full ring-[0.5px] ring-[#D4D4D4] p-4 text-center rounded-xl">
          <p className="text-sm font-light text-[#2B2B2B]">Brak wybranych usług</p>
        </div>
      }
  
      {bookingStep !== 4 
        ? <BookingButtonNextStep bookingStep={bookingStep} nextStepFn={setNextBookingStep} />
        : <BookingButtonBookAppointment businessId={businessId} />
      }
    </div>
  )
}
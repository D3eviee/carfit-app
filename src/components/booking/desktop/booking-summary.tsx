'use client'
import { BookingSummaryItem } from "@/components/booking/booking-summary-item";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Service } from "@/lib/types";
import { useAppointmentStore, useCalendarStore } from "@/lib/store";
import { pl } from "date-fns/locale";
import BookingNextStepButton from "../booking-next-step-button";
import BookingBookVisitButton from "./booking-book-visit-button";

type BookingSummaryProps = {
    services: Service[]
    bookingStep: number
    businessId: string
    setNextBookingStep: () => void
    resetBookingProcess: () => void 
  }

export default function BookingSummary({services, bookingStep, businessId, setNextBookingStep, resetBookingProcess}:BookingSummaryProps) {
  // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
  const selectedServices = useAppointmentStore((store) => store.selectedServices)
  const selectedDate = useCalendarStore(store => store.selectedDate)
  const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
  const clientMessage = useAppointmentStore((store) => store.clientMessage)

  // appointment date and time
  const appointmentTimeFormatted = `${format(appointmentTime, "hh")}:${format(appointmentTime, "mm")}`
  const rawDayOfweek = format(selectedDate, 'cccc', {locale: pl})
  const dayOfweek = rawDayOfweek.slice(0,1).toUpperCase() + rawDayOfweek.slice(1)
  const appointmentDay = format(selectedDate, 'd')
  const appointmentMonth = format(selectedDate, 'MMMM', {locale: pl})
  const appointmentFullDate = `${dayOfweek} ${appointmentDay} ${appointmentMonth}`
    
  //calculating total services price
  const calcTotalPrice = () => {
    let total = 0
    services?.map((item:Service) => { if(selectedServices.includes(item.id)) total +=  Number(item.price)})
    return total
  }

  // calculating total vistit duration
  const calcDuration = () => { 
    let duration = 0
    
    services?.map((item:Service) => {
      if(selectedServices.includes(item.id)) duration +=  item.duration
    })

    const hours = Math.floor(duration/60)
    const minutes = duration%60
    if(hours == 0) return `(${minutes}min)`
    if (minutes==0) return `(${hours}h)`
    return `(${hours}h ${minutes}min)`
  }
  
  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-[#191919] text-2xl leading-none font-semibold">Podsumowanie wizyty</h1>

      <div className="w-full flex flex-col px-5 py-8 gap-3 ring-2 ring-[#F2F2F2] rounded-xl">
        {/* APPOINTMENT DATE AND TIME */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 items-center">
            <Calendar size={23} color="#555" strokeWidth={1.5}/> 
            <p className="font-normal text-[#555] text-sm">{appointmentFullDate}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Clock size={23} color="#555" strokeWidth={1.5}/> 
            <p className="font-normal text-[#555] text-sm">{`${appointmentTimeFormatted} ${calcDuration()}`}</p>
          </div>
        </div>
        
        <hr className="w-full bg-[#D4D4D4]"/>
        
        {/* MESSAGE FROM CLIENT */}
        {
          (clientMessage && clientMessage.length > 0) && 
          <div className="flex flex-col  gap-3">
            <p className="text-sm text-normal text-black px-1">{clientMessage}</p>
            <hr className="w-full bg-[#D4D4D4]"/>
          </div>
        }  
        
        {
          services.map((item: Service, index) => 
            selectedServices.includes(item.id) && 
              <BookingSummaryItem 
                key={index} 
                serviceData={item} 
                activeBookingStep={bookingStep} 
                resetBookingProcess={resetBookingProcess}
              /> 
          )
        }

        <hr className="w-full bg-[#F2F2F7]"/>
          <div className="w-full flex flex-row justify-between px-1">
            <p className="text-sm text-[#191919] font-semibold">Razem</p>
            <p className="text-sm text-[#191919] font-semibold">{calcTotalPrice()} PLN</p>
          </div>
      </div>
  
      
      {bookingStep != 4 
        ? <BookingNextStepButton bookingStep={bookingStep} nextStepFn={setNextBookingStep}/> 
        : <BookingBookVisitButton services={services} businessId={businessId}/>
      } 
    </div>
  )
}
 
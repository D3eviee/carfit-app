'use client'
import { BookingSummaryItem } from "@/components/booking/booking-summary-item";
import {format, getHours, getMinutes } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Service } from "@/lib/types";
import { useAppointmentStore, useCalendarStore, useEventTimeStore } from "@/lib/store";
import BookingSummaryButton from "./booking-summary-button";

type BookingSummaryProps = {
    services: Service[]
    bookingStep: number
    businessId: string
    setNextBookingStep: () => void
    setPreviousBookingStep: () => void
}

export default function BookingSummary({services, bookingStep, businessId, setNextBookingStep}:BookingSummaryProps) {
    // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    const selectedDate = useCalendarStore(store => store.selectedDate)
    const activeEventTime = useEventTimeStore((store) => store.activeEventTime)
    
    //calculating total services price
    const calculateTotalPrice = () => {
        let total = 0
        services?.map((item:Service) => { 
            if(selectedServices.includes(item.id)) total +=  Number(item.price)
        })
        return total
    }

  const calculateDuration = () => { 
    let duration = 0
    
    services?.map((item:Service) => {
      if(selectedServices.includes(item.id)) duration +=  item.duration
    })

    const hours = Math.floor(duration/60)
    const minutes = duration%60

    if(hours == 0) return `(${minutes} min duration)`
    if (minutes==0) return `(${hours} h duration)`
    return `(${hours}h ${minutes} min duration)`
  }
  
  return (
    <div className="hidden gap-5 lg:w-4/12 md:flex md:flex-col">
        <h1 className="text-black text-xl font-medium tracking-normal">Appointment Summary</h1>
        <div className="flex flex-col gap-4 w-full px-5 py-7 border border-[#D4D4D4] rounded-md">
            
            {selectedDate && activeEventTime ? (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 px-1">
                        <div className="flex flex-row gap-2 items-center">
                            <Calendar size={23} color="#555" strokeWidth={1.5}/> 
                            <p className="font-normal text-[#555] text-sm">{`${format(selectedDate, 'cccc')} ${format(selectedDate, 'd')} ${format(selectedDate, 'MMMM')}`}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Clock size={23} color="#555" strokeWidth={1.5}/> 
                            <p className="font-normal text-[#555] text-sm">{`${getHours(activeEventTime)}:${getMinutes(activeEventTime) == 0 ? `${getMinutes(activeEventTime)}0` : getMinutes(activeEventTime)}`} {calculateDuration()}</p>
                        </div>
                    </div>
                    <hr className="w-full bg-[#D4D4D4]"/>
                </div>
              ) : null }
              
              {(selectedServices.length > 0 && services)
              ? services.map((item: Service, index) => (
                selectedServices.includes(item.id) && <BookingSummaryItem key={index} serviceData={item} activeStep={bookingStep}/> 
              ))
              :  <p className="text-center font-normal text-base text-[#555555]">No services added</p>
              }

              {selectedServices.length > 0 && (
                <>
                  <hr className="w-full bg-[#D4D4D4]"/>
                  <div className="w-full flex flex-row justify-between px-1">
                    <p className="text-sm text-[#111111] font-semibold">Total</p>
                    <p className="text-sm text-[#111111] font-semibold">{calculateTotalPrice()} PLN</p>
                  </div>
                </>
              )}

            </div>
            <BookingSummaryButton services={services} bookingStep={bookingStep} businessId={businessId} setNextBookingStep={setNextBookingStep}/>
          </div>
  )
}
 
'use client'
import { cn } from "@/utils";
import { addMinutes, getMonth, getYear } from "date-fns";
import { Service } from "@/lib/types";
import { useAppointmentStore, useCalendarStore, useEventTimeStore } from "@/lib/store";
import { addReservation } from "@/app/(landing)/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type BookingSummaryButtonProps = {
    services: Service[]
    bookingStep: number
    businessId: string
    setNextBookingStep: () => void
}

export default function BookingSummaryButton({services, bookingStep, businessId, setNextBookingStep}:BookingSummaryButtonProps) {
    const router = useRouter()
    
    // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    const selectedDate = useCalendarStore(store => store.selectedDate)
    const activeEventTime = useEventTimeStore((store) => store.activeEventTime)
    
    
    const isButtonDisabled = () => {
        if(bookingStep == 1){
            if(selectedServices.length==0) return true
            else return false
        }
        else if(bookingStep == 2){
            if(selectedDate == null || activeEventTime == null) return true
            else return false
        }
    }

    const mutation = useMutation({
        mutationKey: ["addReservation"],
        mutationFn: async () => {
            try{
                let appointmentDuration = 0
                let appointmentCharge = 0
                
                services?.forEach((item: Service) => {
                    if (selectedServices.includes(item.id)) {
                        appointmentDuration += item.duration
                        appointmentCharge += parseFloat(item.price);
                    }
                })
                
                const newReservationData = {
                    businessId: businessId,
                    servicesIds: selectedServices,
                    reservationYear: getYear(activeEventTime!),
                    reservationMonth: getMonth(activeEventTime!),
                    reservationStart: activeEventTime!,
                    reservationEnd: addMinutes(activeEventTime!, appointmentDuration),
                    duration: appointmentDuration,
                    charge: appointmentCharge,
                    status: "Zarezerwowana",
                    clientName: "",
                    clientPhone: "",
                }

                const result = await addReservation(newReservationData)
                return result  
            }catch(error){
                console.error("Error in addReservation:", error)
            }
        }
    })

  const handleBooking = () =>{
    try{ 
      mutation.mutate()
      router.replace('/')
    }catch(error){
      console.log(error)
    }
  }

  return (
    <button 
        disabled={isButtonDisabled()} 
        onClick={bookingStep === 3 ? () => handleBooking() : setNextBookingStep}
        className={cn("w-full py-3.5 text-center font-normal text-base rounded-md md:w-full", 
            isButtonDisabled() ? "bg-[#F2F4F8] text-[#555555]" : "bg-[#000] text-[#FFFFFF] hover:bg-[#111]")}
    >
        {bookingStep === 3 ? "Book" : "Next"}
    </button>
  )
}
 
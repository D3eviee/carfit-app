'use client'
import { Service } from "@/lib/types";
import { useAppointmentStore} from "@/lib/store";
import BookingNextStepButton from "./booking-next-step-button";

type BookingStatusBarMobileProps = {
    services: Service[]
    bookingStep: number
    setNextBookingStep: () => void
    setPreviousBookingStep: () => void
}

export default function BookingStatusBarMobile({services, bookingStep, setNextBookingStep}:BookingStatusBarMobileProps) {
    // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    
    // calculating total services price
    const calcAppointmentTotalPrice = () => {
        let total = 0
        services?.map((item:Service) => { 
            if(selectedServices.includes(item.id)) total +=  Number(item.price)
        })
        return total
    }

    // calculating total appointment duration
    const calcAppointmentDuration = () => { 
      let duration = 0
      
      services?.map((item:Service) => {
        if(selectedServices.includes(item.id)) duration +=  item.duration
      })
      
      const hours = Math.floor(duration/60)
      const minutes = duration%60
      
      if(hours == 0) return `${minutes}min`
      if (minutes==0) return `${hours}h`
      return `${hours}h ${minutes}min`
  }
  
  return (

    (selectedServices.length > 0 &&
    <div className="w-full sticky bottom-0 left-0 md:hidden bg-[#F2F2F7] shadow-inner-glass px-3 py-2">
      <div className="w-full h-full flex flex-row ">
        <div className="w-full flex flex-col justify-around">
          <p className="text-sm text-[#111111] font-semibold">{selectedServices.length == 1 ? `${selectedServices.length} usługa` : `${selectedServices.length} usługi`}</p>
          <div className="flex flex-row gap-2">
            <p className="text-xs text-[#191919] font-medium">{calcAppointmentTotalPrice()} PLN</p>
            <p className="text-xs text-[#191919] font-medium">{calcAppointmentDuration()}</p>
          </div>
        </div>

        <BookingNextStepButton 
          bookingStep={bookingStep} 
          nextStepFn={setNextBookingStep}
        />
      </div>
    </div>
    )
  )
}
 
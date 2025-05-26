'use client'
import { Service } from "@/lib/types";
import { useAppointmentStore} from "@/lib/store";
import BookingSummaryButton from "./booking-summary-button";

type BookingStatusBarMobileProps = {
    services: Service[]
    bookingStep: number
    businessId: string
    setNextBookingStep: () => void
    setPreviousBookingStep: () => void
}

export default function BookingStatusBarMobile({services, bookingStep, businessId, setNextBookingStep}:BookingStatusBarMobileProps) {
    // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    
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

    if(hours == 0) return `${minutes}min`
    if (minutes==0) return `${hours}h`
    return `${hours}h ${minutes}min`
  }
  
  return (
    (selectedServices.length > 0 &&
    <div className="w-full fixed bottom-0 left-0 md:hidden bg-[#F2F4F8] px-3 py-1">
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col gap-2 w-full border-[#D4D4D4] rounded-md">
          <p className="text-sm text-[#111111] font-medium">{services.length == 1 ? `${services.length} service` : `${services.length} services`}</p>
          <div className="flex flex-row gap-4">
            <p className="text-sm text-[#111111] font-semibold">{calculateTotalPrice()} PLN</p>
            <p className="text-sm text-[#111111] font-semibold">{calculateDuration()}</p>
          </div>
          
        </div>

        <BookingSummaryButton services={services} bookingStep={bookingStep} businessId={businessId} setNextBookingStep={setNextBookingStep}/>
      </div>
    </div>
    )
  )
}
 
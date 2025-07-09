'use client'
import { cn } from "@/utils";
import { useAppointmentStore, useCalendarStore } from "@/lib/store";

type BookingNextStepButtonProps = {
    bookingStep: number
    nextStepFn: () => void
}

export default function BookingNextStepButton({bookingStep, nextStepFn}:BookingNextStepButtonProps) {
    // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    const selectedDate = useCalendarStore(store => store.selectedDate)
    const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
    
    const isButtonDisabled = () => {
        if(bookingStep == 1){
            if(selectedServices.length==0) return true
            else return false
        }
        else if(bookingStep == 2 || bookingStep == 3){
            if(selectedDate == null || appointmentTime == null) return true
            else return false
        }
    }
  return (
    <>
        <button 
            disabled={isButtonDisabled()} 
            onClick={nextStepFn}
            className={cn("w-full text-center font-normal text-base rounded-xl md:w-full py-3 bg-gradient-to-b from-[#313131] to-[#141414] text-[#FFFFFF] hover:bg-[#333] hover:cursor-pointer", 
                isButtonDisabled() && "bg-[#777] hover:bg-[#777")}
        >
            Dalej
        </button>
    </>

  )
}
      
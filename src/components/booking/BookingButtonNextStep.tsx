'use client'
import { cn } from "@/utils";
import { useAppointmentStore, useCalendarStore } from "@/lib/store";

type BookingButtonNextStepProps = {
  bookingStep: number
  nextStepFn: () => void
}

export const BookingButtonNextStep = ({ bookingStep, nextStepFn }: BookingButtonNextStepProps) => {
  const hasServices = useAppointmentStore((store) => store.selectedServices.length > 0)
  const hasTime = useAppointmentStore((store) => store.appointmentTime !== null)
  const isDisabled = bookingStep === 1 ? !hasServices : !hasTime

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={nextStepFn}
      className={cn(
        "w-full text-center font-normal text-base rounded-xl md:w-full py-2.5 bg-linear-to-b from-[#313131] to-[#141414] text-[#FFFFFF] hover:bg-[#333] cursor-pointer active:scale-xs duration-150 transition-all",
        isDisabled && "bg-linear-to-b from-[#D4D4D4] to-[#D4D4D4]"
      )}
    >
      Dalej
    </button>
  )
}
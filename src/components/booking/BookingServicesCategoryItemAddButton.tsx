"use client"
import type { MouseEvent } from "react"
import { Minus, Plus } from "lucide-react"
import { useAppointmentStore } from "@/lib/store"
import { cn } from "@/utils"

export const BookingServicesCategoryItemAddButton = ({ serviceId }: { serviceId: string }) => {
  const toggleSelectedService = useAppointmentStore((store) => store.toggleSelectedService)
  const isSelected = useAppointmentStore((store) => store.selectedServices.includes(serviceId))

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleSelectedService(serviceId)
  }
  
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-label={isSelected ? "Usuń usługę" : "Dodaj usługę"}
      onClick={handleClick}
      className={cn(
        "bg-[#F2F2F8] inset-shadow-glass text-sm text-[#191919] font-semibold px-2 py-2 rounded-xl ring-[#F2F2F8] ring-offset-[2px] ring-1 transition-all duration-100 ease-out cursor-pointer active:scale-xs",
        isSelected && "bg-linear-to-b from-[#313131] to-[#141414] text-white"
      )}
    >
      {isSelected ? <Minus size={15} /> : <Plus size={15} />}
    </button>
  )
}
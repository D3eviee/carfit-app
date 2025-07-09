'use client'
import { useAppointmentStore } from "@/lib/store";
import { cn } from "@/utils";
import { Minus, Plus } from "lucide-react";

export const BookingServicesCategoryItemAddButton = ({serviceId}:{serviceId: string}) => {
  const handleAddingService = () => {
    toggleSelectedService(serviceId)
  }
  const toggleSelectedService = useAppointmentStore((store) => store.toggleSelectedService)
  const selectedServices = useAppointmentStore((store) => store.selectedServices)

  return (
      <div 
      className={cn("bg-[#F2F2F8] shadow-inner-glass text-sm text-[#191919] font-semibold px-2 py-2 rounded-xl border transition-all duration-100 ease-out hover:cursor-pointer active:scale-105",
        selectedServices.find((selectedService) => selectedService == serviceId ) && "bg-gradient-to-b from-[#313131] to-[#141414] text-white "
      )}
      onClick={handleAddingService}
      >
        {selectedServices.find((selectedService) => selectedService == serviceId ) ? <Minus size={15}/> : <Plus size={15}/>}
      </div>
  )
}
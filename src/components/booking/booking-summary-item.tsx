'use client'
import { useAppointmentStore } from "@/lib/store";
import { Service } from "@/lib/types";
import { displayAppointmentTime } from "@/utils";
import { Dot, X } from "lucide-react";

type BookingSummaryItemProps = {
  serviceData: Service
  activeBookingStep: number
  resetBookingProcess: () => void
}

export const BookingSummaryItem = ({activeBookingStep, serviceData, resetBookingProcess}:BookingSummaryItemProps) => {
  const toggleSelectedService = useAppointmentStore((store) => store.toggleSelectedService)
  const selectedServices = useAppointmentStore((store) => store.selectedServices)

  const handleRemovingItem = () => {
    toggleSelectedService(serviceData.id)
    
    const updatedLength = useAppointmentStore.getState().selectedServices.length;
    if (updatedLength === 0 && activeBookingStep !== 1) resetBookingProcess()
  }

  return (
    <div className="flex flex-row justify-between items-center w-full bg-[#F2F2F7] p-2.5 rounded-md">
        <div className="flex flex-col gap-1.5">
            <h1 className="text-sm text-[#191919] font-normal">{serviceData.name}</h1>
            <div className="flex flex-row items-center">
              <p className="text-sm text-[#191919]">{displayAppointmentTime(serviceData.duration)}</p>  
              <Dot size="18" color="#333" />
              <p className="text-sm text-[#191919] font-normal">{serviceData.price} PLN</p>
            </div>
        </div>
        {activeBookingStep != 4 && 
        <X size={20} onClick={handleRemovingItem} className="text-[#333] hover:cursor-pointer hover:text-[#111111] "/>
        }
    </div>
  );
};

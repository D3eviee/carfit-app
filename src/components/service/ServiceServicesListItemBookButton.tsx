'use client'
import { useAppointmentStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export const ServiceServicesListItemBookButton = ({ serviceId }: { serviceId: string }) => {
  const path = usePathname();
  const router = useRouter();
  const resetSelectedServices = useAppointmentStore((store) => store.resetSelectedServices)
  const toggleSelectedService = useAppointmentStore((store) => store.toggleSelectedService)
  
  const handleBook = (e: MouseEvent<HTMLButtonElement>) => {
     e.stopPropagation()
    // Start booking with exactly this service (clears leftovers from other businesses)
    resetSelectedServices()
    toggleSelectedService(serviceId)
    router.push(`${path}/booking`)
  }

  return (
    <button
      type="button"
      onClick={handleBook}
      className="bg-[#F2F2F8] inset-shadow-glass text-sm text-[#191919] font-semibold px-5 py-2 rounded-xl ring-[0.5px] ring-offset-1 ring-[#D4D4D4] transition-all duration-100 ease-out hover:cursor-pointer active:scale-105"
    >
      Umów
    </button>
  );
};
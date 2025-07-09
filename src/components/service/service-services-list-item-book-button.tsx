'use client'
import { useAppointmentStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const ServiceServicesListItemBookButton = ({serviceId}:{serviceId:string}) => {
  const path = usePathname();
  const router = useRouter();
  const toggleSelectedService = useAppointmentStore((store) => store.toggleSelectedService)
  

  const handleRedirect = () => {
    toggleSelectedService(serviceId)
    router.replace(`${path}/booking`);
  }


  return (
      <div 
        onClick={handleRedirect}
        className="bg-[#F2F2F8] shadow-inner-glass text-sm text-[#191919] font-semibold px-5 py-2 rounded-xl border transition-all duration-100 ease-out hover:cursor-pointer active:scale-105"
      >
        Umów
      </div>
  );
};
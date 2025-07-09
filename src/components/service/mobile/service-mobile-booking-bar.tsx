'use client'
import { usePathname, useRouter } from "next/navigation";

type ServiceMobileBookingBarProps = {
  serviceCount:number
}

export const ServiceMobileBookingBar = ({serviceCount}:ServiceMobileBookingBarProps) => {
    const path = usePathname();
    const router = useRouter();

    const handleRedirect = () => {
      router.replace(`${path}/booking`);
    };
    
    return (
      <div className="fixed bottom-0 w-full h-16 px-5 flex justify-between items-center bg-[#F2F2F7] shadow-inner-glass-sm border-t-[0.5px]">
        <p className="text-sm text-[#191919] font-light">Oferuje {serviceCount} usług</p>
        <div 
          className="w-fit px-10 py-3 rounded-lg bg-gradient-to-b from-[#313131] to-[#141414] shadow-md text-white hover:bg-[#333333] text-sm text-center hover:cursor-pointer" 
          onClick={handleRedirect}>
            Zarezerwuj
        </div>
      </div>
  );
};

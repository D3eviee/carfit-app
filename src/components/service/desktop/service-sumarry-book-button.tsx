'use client'
import { usePathname, useRouter } from "next/navigation";

export const ServiceSummaryBookButton = () => {
    const path = usePathname();
    const router = useRouter();

    const handleRedirect = () => {
      router.replace(`${path}/booking`);
    };
    
    return (
    <div 
      className="w-full font-medium text-sm  text-center py-1.5 rounded-lg bg-gradient-to-b from-[#313131] to-[#141414] shadow-md text-white hover:bg-[#333333] hover:cursor-pointer active:scale-105 transition-all duration-75 xl:rounded-xl xl:py-2 xl:text-base" 
      onClick={handleRedirect}
    >
      Zarezerwuj wizytę
    </div>
  )
}

'use client'
import { usePathname, useRouter } from "next/navigation";
import { useAppointmentStore } from "@/lib/store"
import { pluralPl } from "@/utils"
import { useEffect, useState } from "react"

export const ServiceMobileBookingBar = ({ serviceCount }: { serviceCount: number }) => {
  const path = usePathname();
  const router = useRouter();
  
  const resetSelectedServices = useAppointmentStore((store) => store.resetSelectedServices)
  const [showBar, setShowBar] = useState(true)

  // Same behaviour as before (hide once the details section has been scrolled to),
  // but without running code on every scroll event
  useEffect(() => {
    const sentinel = document.getElementById("service-details-end")
    if (!sentinel) return

    const observer = new IntersectionObserver(([entry]) => {
      setShowBar(!(entry.isIntersecting || entry.boundingClientRect.top < 0))
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const handleRedirect = () => {
    resetSelectedServices()
    router.push(`${path}/booking`)
  }

  if (!showBar) return null
  
  return (
    <div className="fixed z-50 bottom-0 w-full py-1.5 px-4 flex justify-between items-center bg-[#F2F2F7] inset-shadow-glass border-t-[0.5px] border-t-[#D4D4D4]">
      <p className="text-sm text-[#191919] font-light">Oferuje {serviceCount} {pluralPl(serviceCount, "usługę", "usługi", "usług")}</p>
      
      <button
        type="button"
        onClick={handleRedirect}
        className="w-fit px-10 py-3 rounded-2xl bg-linear-to-b from-[#313131] to-[#141414] shadow-md text-white hover:bg-[#333333] text-sm text-center hover:cursor-pointer active:scale-95 transition-all duration-200"
      >
        Zarezerwuj
      </button>
    </div>
  );
};    
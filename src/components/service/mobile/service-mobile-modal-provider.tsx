'use client'
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

type ServiceMobileModalProviderProps = {
  children: ReactNode
  isOpen:boolean
  onClose: () => void
  title: string
  topPosition: number
}
export const ServiceMobileModalProvider = ({isOpen, onClose, title, topPosition, children}: ServiceMobileModalProviderProps) =>  {
  const handleClosingModal =  () =>  {
    document.body.style.overflow = ""
    onClose()
  }

  return (
    createPortal(
      <div 
        className={cn("z-30 absolute h-full w-full flex flex-col bg-[#FFF] transition-all duration-150 ease-in-out overflow-scroll", isOpen ? "translate-x-0" : "translate-x-full")}
        style={{top: topPosition}}
      >
        {/* NAV */}
        <div className="z-50 left-0 top-0 absolute flex w-full items-center">
          <div 
            className="mt-4 ml-4 backdrop-blur-lg rounded-full shadow-inner-glass ring-1 ring-[#FFF] p-3 active:scale-105 transition duration-75 ease-in"
            onClick={handleClosingModal}
          >
            <ChevronLeft color="#000" size={25} strokeWidth={2}/>
          </div>
        </div>

        <div className="h-full px-4 pt-20 overflow-scroll space-y-5">
            <h1 className="text-[#191919] text-2xl font-bold ">{title}</h1>
            {children}
        </div>
      </div>, 
    document.body)
  )
}
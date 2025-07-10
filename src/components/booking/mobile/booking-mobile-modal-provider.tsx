'use client'
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";

type BookingMobileModalProviderProps = {
  children: ReactNode
  isOpen:boolean
  onClose: () => void
}
export const BookingMobileModalProvider = ({isOpen, onClose, children}: BookingMobileModalProviderProps) =>  {
  const handleClosingModal =  () =>  {
    document.body.style.overflow = ""
    onClose()
  }

  if(!isOpen) return null

  return (
    createPortal(
      <div 
        className={cn("absolute z-30 bg-[#FFF] top-0  h-full w-full flex flex-col  transition-all duration-150 ease-in-out overflow-scroll", isOpen ? "translate-x-0" : "translate-x-full")}
      >
        {/* NAV */}
        <div className="z-50 left-0 top-0 absolute flex w-full  justify-end items-center">
          <div 
            className="mt-4 mr-4 backdrop-blur-lg rounded-full shadow-inner-glass ring-1 border ring-[#FFF] p-2 active:scale-105 transition duration-75 ease-in"
            onClick={handleClosingModal}
          >
            <X color="#000" size={25} strokeWidth={2}/>
          </div>
        </div>

        <div className="h-full px-4 pt-20 overflow-scroll space-y-5">
            {children}
        </div>
      </div>, 
    document.body)
  )
}
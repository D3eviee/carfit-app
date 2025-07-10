'use client'
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { X } from "lucide-react";
import { ReactNode, useState } from "react";

type BookingModalProviderProps = {
  children: ReactNode
  isOpen:boolean
  onClose: () => void
}
export const BookingModalProvider = ({isOpen, onClose, children}: BookingModalProviderProps) =>  {
  const handleClosingModal =  () =>  {
    document.body.style.overflow = ""
    onClose()
  }

  if(!isOpen) return null

  return (
    createPortal(
      <div className="absolute z-30 bg-[#000]/80 top-0 h-full w-full flex justify-center items-center">
        <div className="bg-white py-8 px-4 rounded-2xl flex flex-col gap-8">
          {/* NAV */}
          <div className="flex w-full justify-end items-center px-4">
            <div 
              className="backdrop-blur-lg rounded-full shadow-inner-glass ring-1 border ring-[#FFF] p-2 active:scale-105 transition duration-75 ease-in"
              onClick={handleClosingModal}
            >
              <X color="#000" size={25} strokeWidth={2}/>
            </div>
          </div>

          <div className="h-full px-4  overflow-scroll">
              {children}
          </div>
        </div>
      </div>, 
    document.body)
  )
}
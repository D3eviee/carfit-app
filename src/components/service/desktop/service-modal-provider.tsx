'use client'
import { createPortal } from "react-dom";
import { ChevronLeft } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type ServiceModalProviderProps = {
  children: ReactNode
  isOpen:boolean
  onClose: () => void
  title: string
}
export const ServiceModalProvider = ({isOpen, onClose, title, children}: ServiceModalProviderProps) =>  {
  const [topPosition, setTopPosition] = useState(window.scrollY)


  const handleClosingModal =  () =>  {
    document.body.style.overflow = ""
    onClose()
  }

  if (!isOpen) return null

  return (
    createPortal(
      <div 
        className="z-30 absolute top-0 h-full w-full flex flex-col justify-center items-center bg-[#000]/60 transition-all duration-150 ease-in-out overflow-scroll"
        style={{top: topPosition}}
      >
        <div className="relative z-30 h-3/4 flex flex-col bg-white rounded-2xl px-2 xl:px-4 w-[90%] xl:w-[75%] 2xl:w-[60%]">
          {/* NAV */}
          <div className="z-50 left-0 top-0 absolute flex w-full items-center px-4">
            <div 
              className="mt-4 ml-4 backdrop-blur-lg rounded-full shadow-inner-glass ring-1 ring-[#FFF] p-3 active:scale-105 transition duration-75 ease-in hover:cursor-pointer"
              onClick={handleClosingModal}
            >
            <ChevronLeft color="#000" size={25} strokeWidth={2}/>
          </div>
        </div>

        <div className="h-full px-4 pt-20 overflow-scroll space-y-5 scrollbar-none">
            <h1 className="text-[#191919] text-2xl font-bold ">{title}</h1>
            {children}
        </div>

        </div>
        
      </div>, 
    document.body)
  )
}
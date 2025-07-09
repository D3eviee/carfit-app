'use client'
import { useState } from "react"
import AppointmentsSumarryCancelModal from "./appointments-sumarry-cancel-modal"

export default function AppointmentsSumarryCancelButton({appointmentId, parentOnClose}:{appointmentId:string, parentOnClose: () => void}) {
  const [isOpen, setIsOpen] = useState(false)

  return(
    <>
      <div className="absolute left-0 bottom-10  w-full flex flex-row justify-center ">
        <div 
          className="px-4 py-2 rounded-full bg-[#F2F4F8] border border-[#D4D4D4] hover:cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <p className="text-sm text-[#FF5F57] font-medium">Anuluj</p>
        </div>

        <AppointmentsSumarryCancelModal open={isOpen} onClose={() => {setIsOpen(false)}} appointmentId={appointmentId} parentClose={parentOnClose}/>
      </div>
    </>
  )
}


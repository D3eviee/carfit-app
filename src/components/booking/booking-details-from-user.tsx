'use client'

import { useAppointmentStore } from "@/lib/store"
import { useRef } from "react"

export default function BookingDetailsFromUser() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const setAppointmentUserDetails = useAppointmentStore((store) => store.setClientMessage)
  const clientMessage = useAppointmentStore((store) => store.clientMessage)

  const handleOnBlur = () => {
    if (textareaRef.current) setAppointmentUserDetails(textareaRef.current.value)
  }
  
  return (
    <div className="w-full  flex flex-col gap-5">
        <h1 className="text-[#191919] text-2xl leading-none font-semibold">Dodatkowe informacje</h1>
        <p className="text-[#191919] text-sm  font-light">Możesz przekazać nam szczegóły na temat pojazdu, który ma zostać poddany usłudze lub problemowi z którym się zmagasz.</p>

        <textarea
          defaultValue={clientMessage} 
          ref={textareaRef}
          className="w-full bg-[#F2F2F7] text-[#191919] rounded-lg p-2 text-base resize-none ring-1 ring-[#D4D4D4] shadow-sm"
          rows={10}
          onBlur={handleOnBlur}
        ></textarea>
    </div>
  )
}
 
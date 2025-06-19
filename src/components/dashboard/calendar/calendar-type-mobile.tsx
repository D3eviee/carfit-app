'use client'
import { CalendarCog } from "lucide-react"
import { useState } from "react"
import CalendarTypeMobileOverlay from "./calendar-type-mobile-overlay"

export default function CalendarMobileType() {
  const [open, setOpen] = useState(false)

  return (
    <>
    <div 
      className="relative border-[0.5px] border-[#D4D4D] p-1 bg-[#F2F4F8] rounded-md"
      onClick={() => setOpen(true)}  
    >
    <CalendarCog size={25} color="#000" strokeWidth={1}/>
    </div>
    <CalendarTypeMobileOverlay
      open={open}
      onClose={() => setOpen(false)}
    />
    </>
  )
}
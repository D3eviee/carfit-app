'use client'
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { Calendar1, CalendarDays } from "lucide-react";
import { useDashboardMobileCalendarTypeStore } from "@/lib/store";

type ModalProviderProps = {
  open: boolean
  onClose: () => void
}

export default function CalendarMobileTypeSelector({ open, onClose}: ModalProviderProps) {
  const setMobileCalendarType = useDashboardMobileCalendarTypeStore(store => store.setMobileCalendarType)
  if(!open) return null
  
  return createPortal(
    <div 
      className={cn("absolute top-0 right-0 w-full h-lvh z-10")}
      onClick={onClose}
    >
      <div className="absolute top-[74px] left-4 bg-[#F2F4F8] flex flex-col border-[0.5px] border-[#D4D4D4] shadow-md rounded">
        <div 
          className="flex flex-row items-center gap-2 pl-4 pr-8 py-1.5"
          onClick={() => setMobileCalendarType("single-day")}
        >
          <Calendar1 size={18} color="#333" strokeWidth={1}/>
          <p className="text-[#333] text-md font-light">Dzień</p>
        </div>
        <hr/>
        <div 
          className="flex flex-row items-center gap-2 pl-4 pr-8 py-1.5"
          onClick={() => setMobileCalendarType("list")}
        >
          <CalendarDays size={18} color="#333" strokeWidth={1}/>
          <p className="text-[#333] text-md font-light">Lista</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
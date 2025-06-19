'use client'
import { useBusinessCalendarNavigationStore, useDashboardMobileCalendarTypeStore } from "@/lib/store";
import { useState } from "react";
import CalendarAddApppointmentModal from "./calendar-add-appointment-modal";
import CalendarTypeSelector from "./calendar-type-bar";
import CalendarDay from "./calendar-day";
import CalendarWeek from "./calendar-week";

export default function CalendarMain() {
  //ZUSTAND STORE FOR MANAGING TYPE OF CALENDAR
  const calendarType = useBusinessCalendarNavigationStore(store => store.calendarType)
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="w-full h-full flex-col gap-3 overflow-hidden md:flex">
      {/* TOP MENU */}
      <div className="w-full flex flex-row items-center justify-between">
        <CalendarTypeSelector/>
        <button 
          className="py-2 px-3 text-sm font-medium text-[#EEE] bg-[#111] rounded-xl  shadow-[0px_1px_1px_0px_#00000040] outline-none hover:cursor-pointer hover:bg-[#000]"
          onClick={()=>{setOpenModal(true)}}
        >
          + Add event
        </button>
      </div>

      {/* CALENDAR */}
      <div className="w-full h-full min-h-0 overflow-hidden">
        {calendarType == "week" &&  <CalendarWeek/>}
        {calendarType == "day" && <CalendarDay/> }
      </div>
      {openModal && <CalendarAddApppointmentModal  open={openModal} onClose={() => setOpenModal(false)}/>}
    </div>
  );
}
'use client'
import { useBusinessCalendarNavigationStore, useDashboardMobileCalendarTypeStore } from "@/lib/store";
import { useState } from "react";
import CalendarAddApppointmentModal from "./calendar-add-appointment-modal";
import CalendarMobileType from "./calendar-type-mobile";
import CalendarMobileListView from "./calendar-mobile-list-view";
import CalendarMobileDayView from "./calendar-mobile-day-view";

export default function CalendarMobile() {
  //ZUSTAND STORE FOR MANAGING TYPE OF CALENDAR
  //const openCalendarType = useBusinessCalendarNavigationStore(store => store.openCalendarType)
  const mobileCalendarType = useDashboardMobileCalendarTypeStore(store => store.mobileCalendarType)
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden lg:hidden">
      {/* TOP MENU */}
      <div className="w-full flex flex-row items-center justify-between">
        <CalendarMobileType/>
        <button 
          className="py-1.5 px-3 text-sm font-medium text-[#FFF] bg-[#000] rounded-md shadow-[0px_1px_1px_0px_#00000040] outline-none hover:cursor-pointer hover:bg-[#111]"
          onClick={()=>{setOpenModal(true)}}
        >
          + Add event
        </button>
      </div>
      <div className="w-full h-full min-h-0 overflow-hidden ">
        {mobileCalendarType == "list" && <CalendarMobileListView/> }
        {mobileCalendarType == "single-day" && <CalendarMobileDayView/> }
      </div>
      {openModal && <CalendarAddApppointmentModal  open={openModal} onClose={() => setOpenModal(false)}/>}
    </div>
  );
}
'use client'
import { useBusinessCalendarNavigationStore } from "@/lib/store";
import CalendarTypeSelector from "./calendar-type-bar";
import CalendarDay from "./calendar-day";
import CalendarWeek from "./calendar-week";
import CalendarAddApppointmentButton from "./calendar-add-appointment-button";

export default function CalendarMain() {
  //ZUSTAND STORE FOR MANAGING TYPE OF CALENDAR
  const calendarType = useBusinessCalendarNavigationStore(store => store.calendarType)

  return (
    <div className="w-full h-full flex-col gap-3 overflow-hidden md:flex">
      {/* TOP MENU */}
      <div className="w-full flex flex-row items-center justify-between">
        <CalendarTypeSelector/>
        <CalendarAddApppointmentButton/>
      </div>
      {/* CALENDAR */}
      <div className="w-full h-full min-h-0 overflow-hidden">
        {calendarType == "week" &&  <CalendarWeek/>}
        {calendarType == "day" && <CalendarDay/> }
      </div>
    </div>
  );
}
'use client'
import { useDashboardMobileCalendarTypeStore } from "@/lib/store";
import CalendarMobileType from "./calendar-type-mobile";
import CalendarMobileListView from "./calendar-mobile-list-view";
import CalendarMobileDayView from "./calendar-mobile-day-view";
import CalendarAddApppointmentButton from "./calendar-add-appointment-button";

export default function CalendarMobile() {
  //ZUSTAND STORE FOR MANAGING TYPE OF CALENDAR
  const mobileCalendarType = useDashboardMobileCalendarTypeStore(store => store.mobileCalendarType)

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden lg:hidden">
      {/* TOP MENU */}
      <div className="w-full flex flex-row items-center justify-between">
        <CalendarMobileType/>
        <CalendarAddApppointmentButton/>
      </div>

      <div className="w-full h-full min-h-0 overflow-hidden ">
        {mobileCalendarType == "list" && <CalendarMobileListView/> }
        {mobileCalendarType == "single-day" && <CalendarMobileDayView/> }
      </div>
    </div>
  );
}
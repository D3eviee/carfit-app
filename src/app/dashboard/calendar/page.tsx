import Calendar from "@/components/dashboard/calendar/calendar";
import CalendarMobile from "@/components/dashboard/calendar/calendar-mobile"

export default function CalendarPage() {
  return (
    <div className="w-full h-full  overflow-y-hidden">
      {/* MOBIEL VIEW */}
      <CalendarMobile/>

      {/* DESKTOP VIEW */}
      <Calendar/>
    </div>
  );
}
import CalendarEventList from "@/components/dashboard/calendar/calendar-event-list";
import CalendarMonth from "./calendar-month";

export default function CalendarList() {
  return (
    <div className="h-full flex flex-col gap-2">
      <CalendarMonth />
      <div className="flex-grow min-h-0">
        <CalendarEventList />
      </div>
    </div>
  );
}
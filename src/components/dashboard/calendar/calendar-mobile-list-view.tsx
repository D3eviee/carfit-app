import CalendarMobileEventList from "./calendar-mobile-event-list";
import CalendarMobileMonth from "./calendar-mobile-month";

export default function CalendarMobileListView() {
  return (
    <div className="h-full flex flex-col gap-2">
      <CalendarMobileMonth />
      <div className="flex-grow min-h-0">
        <CalendarMobileEventList />
      </div>
    </div>
  );
}
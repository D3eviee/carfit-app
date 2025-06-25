import CalendarList from "./calendar-list";
import CalendarMain from "./calendar-main";

export default function Calendar() {
  return (
    <div className="w-full h-full overflow-y-hidden hidden md:flex gap-3">
        <div className="w-full h-full md:w-1/2 xl:w-3/4">
          <CalendarMain/>
        </div>
        <div className="h-full md:w-1/2 xl:w-1/4 pt-[50px]">
          <CalendarList/>
        </div>
      </div>
  )
}
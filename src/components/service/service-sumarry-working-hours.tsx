import { getISODay } from "date-fns"
import { DotIcon } from "lucide-react"
import { WorkingDay } from "@/lib/types";

export const ServiceSumarryWorkingHours = ({workingHoursData}:{workingHoursData:WorkingDay[]}) => {
  const todayDayIndex = getISODay(new Date())
  const daysOfWeek = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    
  return (
    <div className="flex flex-col gap-3">
      <p className="text-base text-[#3A3A3A] font-semibold leading-none xl:text-lg">Godziny otwarcia</p>

      <div className="flex flex-col gap-1 xl:gap-2.5">
        {workingHoursData?.map((day, index) => (
          <div key={index} className="w-full flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <DotIcon strokeWidth={4}  color={day.isOpen ? "#009600" : "#D05151"}/>
              <p className={`text-sm xl:text-base text-[#3A3A3A] ${todayDayIndex == index+1 ? "font-semibold" : "font-normal" }`}>{daysOfWeek[index]}</p>
            </div>
            
            <p 
              className={`text-sm xl:text-base text-[#3A3A3A] tracking-tight ${todayDayIndex == index+1 ? "font-semibold" : "font-normal" }`}>
              {day.isOpen ? `${day.open} - ${day.close}` : `Zamknięte`}
            </p> 
          </div>
        ))} 
      </div>
    </div>
  )
}
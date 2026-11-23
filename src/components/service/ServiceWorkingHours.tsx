import { DotIcon } from "lucide-react"
import { WorkingDay } from "@/lib/types"
import { DAYS_OF_WEEK, getWarsawNow } from "@/utils"

export const ServiceWorkingHours = ({ workingHoursData }: { workingHoursData: WorkingDay[] }) => {
  const { dayIndex: todayIndex } = getWarsawNow()

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg text-[#3A3A3A] font-semibold leading-none">Godziny otwarcia</p>

      <div className="flex flex-col gap-2.5">
        {DAYS_OF_WEEK.map((dayName, index) => {
          const day = workingHoursData.find((d) => d.dayOfWeek === dayName)
          const isOpen = Boolean(day?.isOpen)
          const weight = index === todayIndex ? "font-semibold" : "font-normal"

          return (
            <div key={dayName} className="w-full flex flex-row justify-between">
              <div className="flex flex-row">
                <DotIcon strokeWidth={5} color={isOpen ? "#009600" : "#D05151"} />
                <p className={`text-base text-[#3A3A3A] ${weight}`}>{dayName}</p>
              </div>

              <p className={`text-base text-[#3A3A3A] tracking-tight ${weight}`}>
                {isOpen && day ? `${day.open} - ${day.close}` : "Zamknięte"}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
import { WorkingDay } from "@/lib/types"
import { sortScheduleByDay } from "@/utils"
import { getISODay } from "date-fns"

export const ServiceIsOpenTag = ({ workingHoursData }: { workingHoursData: WorkingDay[] }) => {
  const dayLabels: Record<string, string> = {
    "Poniedziałek": "poniedziałek",
    "Wtorek": "wtorek",
    "Środa": "środę",
    "Czwartek": "czwartek",
    "Piątek": "piątek",
    "Sobota": "sobotę",
    "Niedziela": "niedzielę",
  }
  const sortedSchedule = sortScheduleByDay(workingHoursData)

  const now = new Date()
  const todayIndex = getISODay(now) - 1
  const todayData = sortedSchedule[todayIndex]

  const [nowH, nowM] = [now.getHours(), now.getMinutes()]
  const nowTime = nowH * 60 + nowM

  const [openH, openM] = todayData.open.split(":").map(Number)
  const [closeH, closeM] = todayData.close.split(":").map(Number)
  const openingTimeMinutes = openH * 60 + openM
  const closingTimeMinutes = closeH * 60 + closeM

  const isOpenNow = todayData.isOpen && nowTime >= openingTimeMinutes && nowTime <= closingTimeMinutes
  const beforeOpening = todayData.isOpen && nowTime < openingTimeMinutes
  const afterClosing = todayData.isOpen && nowTime > closingTimeMinutes || !todayData.isOpen

  const nextOpenDayData = [...sortedSchedule.slice(todayIndex + 1), ...sortedSchedule.slice(0, todayIndex + 1)].find(d => d.isOpen)
  
  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number)
    return `${h}:${m.toString().padStart(2, "0")}`
  }

  const openTag = () => {
    if (isOpenNow) {
      return (
        <div className="w-fit bg-[#3BB05A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#4CC06B] shadow-sm">
          <p className="text-[#FFF] text-[15px] font-semibold">Otwarte do {formatTime(todayData.close)}</p>
        </div>
      )
    }

    if (beforeOpening) {
      return (
        <div className="w-fit bg-[#3BB05A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#4CC06B] shadow-sm">
          <p className="text-[#FFF] text-[15px] font-semibold">Otwarte – otwiera się o {formatTime(todayData.open)}</p>
        </div>
      )
    }

    if (afterClosing && nextOpenDayData) {
      const dayLabel = dayLabels[nextOpenDayData.dayOfWeek]
      return (
        <div className="w-fit bg-[#DB594A] flex flex-row space-x-1  px-2.5 rounded-lg border-[0.5px] border-[#EC6A5C]">
          <p className="text-[#FFF] text-[15px] font-medium">Zamknięte – otwiera się w {dayLabel} o {formatTime(nextOpenDayData.open)}</p>
        </div>
      )
    }
    return null
  }
  return <>{openTag()}</>
}

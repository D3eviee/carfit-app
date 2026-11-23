import { WorkingDay } from "@/lib/types"
import { DAYS_OF_WEEK, getWarsawNow } from "@/utils"

const NEXT_DAY_PHRASE: Record<string, string> = {
  "Poniedziałek": "w poniedziałek",
  "Wtorek": "we wtorek",
  "Środa": "w środę",
  "Czwartek": "w czwartek",
  "Piątek": "w piątek",
  "Sobota": "w sobotę",
  "Niedziela": "w niedzielę",
}

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + (m || 0)
}

const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number)
  return `${h}:${(m || 0).toString().padStart(2, "0")}`
}

export const ServiceIsOpenTag = ({ workingHoursData }: { workingHoursData: WorkingDay[] }) => {
  const { dayIndex, minutes: nowTime } = getWarsawNow()
  const findDay = (index: number) => workingHoursData.find((d) => d.dayOfWeek === DAYS_OF_WEEK[index % 7])

  const today = findDay(dayIndex)
  const isOpenToday = Boolean(today?.isOpen)
  const isOpenNow = isOpenToday && nowTime >= toMinutes(today!.open) && nowTime <= toMinutes(today!.close)
  const beforeOpening = isOpenToday && nowTime < toMinutes(today!.open)

  let nextOpenDay: WorkingDay | undefined
  for (let i = 1; i <= 7; i++) {
    const day = findDay(dayIndex + i)
    if (day?.isOpen) {
      nextOpenDay = day
      break
    }
  }

  if (isOpenNow && today) {
    return (
      <div className="w-fit bg-[#3BB05A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#4CC06B] shadow-sm">
        <p className="text-[#FFF] text-[15px] font-semibold">Otwarte do {formatTime(today.close)}</p>
      </div>
    )
  }

  if (beforeOpening && today) {
    return (
      <div className="w-fit bg-[#3BB05A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#4CC06B] shadow-sm">
        <p className="text-[#FFF] text-[15px] font-semibold">Otwarte – otwiera się o {formatTime(today.open)}</p>
      </div>
    )
  }

  if (nextOpenDay) {
    return (
      <div className="w-fit bg-[#DB594A] flex flex-row space-x-1 px-2.5 rounded-lg border-[0.5px] border-[#EC6A5C]">
        <p className="text-[#FFF] text-[15px] font-medium">
          Zamknięte – otwiera się {NEXT_DAY_PHRASE[nextOpenDay.dayOfWeek]} o {formatTime(nextOpenDay.open)}
        </p>
      </div>
    )
  }

  return null
}
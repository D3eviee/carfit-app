import { WorkingDay } from "@/lib/types"
import { format, getISODay } from "date-fns"

// this component displays a tag whether a service is closed
export const ServiceIsOpenTagSimpleTag = ({workingHoursData}:{workingHoursData:WorkingDay[]}) => {
    const now = new Date()
    const todayDayIndex = getISODay(now)
    const nowHour = format(now , "k")
    const nowMinute = format(now , "m")
    const nowTime = `${nowHour}:${nowMinute}`

    const todayWorkingHoursData = workingHoursData[todayDayIndex-1]
    const openingTime = todayWorkingHoursData.open
    const closingTime = todayWorkingHoursData.close
    const isOpen = (nowTime >= openingTime && nowTime <= closingTime)

    return (
        <>
        {isOpen ?
            <p className="w-fit text-[#3BB05A] text-[15px] font-medium bg-[#[#3BB05A]/10 px-2 py-0.5 rounded-md xl:px-5">Otwarte </p>
        : 
            <p className="w-fit text-[#DB594A] text-[15px] font-medium bg-[#DB594A]/10 px-2 py-0.5 rounded-md xl:px-5">Zamknięte</p>
        }
        </>
  )
}
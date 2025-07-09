import { WorkingDay } from "@/lib/types"
import { format, getISODay } from "date-fns"

// this component displays a tag whether a service is closed
// if closed its's gonna show when the next open day is
export const ServiceIsOpenTag = ({workingHoursData}:{workingHoursData:WorkingDay[]}) => {
    const daysOfWeek = ["poniedziałek","wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela", "sadasd"]

    const now = new Date()
    const todayDayIndex = getISODay(now)
    const nowHour = format(now , "k")
    const nowMinute = format(now , "m")
    const nowTime = `${nowHour}:${nowMinute}`

    const todayWorkingHoursData = workingHoursData[todayDayIndex-1]
    const openingTime = todayWorkingHoursData.open
    const closingTime = todayWorkingHoursData.close
    const isOpen = (nowTime >= openingTime && nowTime <= closingTime)

    const nextOpenDayData = workingHoursData.slice(Number(todayDayIndex)).find((item, _) =>  Number(item.dayOfWeek) != todayDayIndex && item.isOpen) || workingHoursData.find((item, _) =>  Number(item.dayOfWeek) != todayDayIndex && item.isOpen) 
    const nextOpenDayOpeningTime  = todayWorkingHoursData.open
    const nextOpenDayFormatted = `czynne w  ${daysOfWeek[Number(nextOpenDayData.dayOfWeek)-1]} o ${nextOpenDayOpeningTime} `


    return (
        <>
            {isOpen ?
            <div className="w-full bg-[#3BB05A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#4CC06B] shadow-sm borders">
                <p className="text-[#FFF] text-[15px] font-semibold">Otwarte do {closingTime}</p>
            </div>
            : 
            <div className="w-full bg-[#DB594A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#EC6A5C]">
                <p className="text-[#FFF] text-[15px] font-medium">Zamknięte - {nextOpenDayFormatted}</p>
            </div>
        }
         </>
  )
}
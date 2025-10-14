'use client'
import { useBusinessCalendarNavigationStore } from "@/lib/store"
import { cn } from "@/utils"

export const DashboardCalendarPrimaryCalendarTypeButton = () => {
  const options =  [{type: "week", dispalyType: "Tydzień"}, {type: "day", dispalyType: "Dzień"}]
  const calendarType = useBusinessCalendarNavigationStore(store => store.calendarType)
  const setCalendarType = useBusinessCalendarNavigationStore(store => store.setCalendarType)

  return (
    <div className="box-border flex bg-[#F2F2F7] rounded-xl p-1">
      {options.map(option => 
        <p 
          key={option.type}
          onClick={()=>setCalendarType(option.type)} 
          className={cn("w-20 flex justify-center items-center rounded-lg text-sm px-3 py-1  hover:cursor-pointer",  
          calendarType == option.type && "bg-[#FFF] ring-[0.2px] ring-[#CCCCCC]")}
        >
          {option.dispalyType}
        </p>
      )}
    </div>
  )
}
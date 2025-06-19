'use client'
import { useBusinessCalendarNavigationStore } from "@/lib/store"
import { cn } from "@/utils"

export default function CalendarTypeSelector() {
  const options =  [{type: "week", dispalyType: "Week"}, {type: "day", dispalyType: "Day"}]

  const calendarType = useBusinessCalendarNavigationStore(store => store.calendarType)
  const setCalendarType = useBusinessCalendarNavigationStore(store => store.setCalendarType)

  return (
    <div className="box-border flex bg-[#E4E5E7] border-black rounded-xl p-1">
      {options.map((option, index) => (
        <p 
          key={index}
          onClick={()=>setCalendarType(option.type)} 
          className={cn("w-20 flex justify-center items-center rounded-lg text-sm px-3 py-1  hover:cursor-pointer",  
          calendarType == option.type && "bg-[#F5F6F8]")}
        >
          {option.dispalyType}
        </p>
      ))}
    </div>
  )
}
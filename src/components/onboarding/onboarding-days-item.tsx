'use client'
import { Pen } from "lucide-react";
import useWorkingDays from "@/lib/store";
import { WorkingDay } from "@/lib/types";

export const OnboardingDaysItem = ({day, onClick}:{day: WorkingDay, onClick: () => void}) => {
  const updateIsOpen = useWorkingDays((state) => state.updateIsOpen)

  return (
    <div className="grid grid-cols-[1fr_8fr_8fr] py-3.5 px-1 items-center border-t-[0.5px] border-[#CCCCCC] first-of-type:border-none">
      <input type="checkbox" className="w-4 h-4" defaultChecked={day.isOpen} onChange={(e)=>{updateIsOpen(day.dayOfWeek, e.target.checked)}}/>
      <h3 className="font-normal text-[#333333] pl-3 text-sm">{day.dayOfWeek}</h3>
      <div className="flex items-center justify-end gap-9">
        <p className="box-border text-right w-full text-sm m-0 text-[#333333] font-light ">{day.isOpen ? `${day.open} - ${day.close}` : "Zamknięte"}</p>
        {day.isOpen ? <Pen color="#777777" size={15} className="hover:cursor-pointer hover:stroke-[#333333]" onClick={onClick}/> : <></>}
      </div>
    </div>
  );
};

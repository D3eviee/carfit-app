'use client'
import { Edit } from "lucide-react";
import { useModalStore, useWorkingDays } from "@/lib/store";
import { WorkingDay } from "@/lib/types";
import { BusinessOnboardingWorkingDaysEditModal } from "@/components/modals/business-onboarding-working-days-edit-modal";

export const BusinessoOnboardingWorkingDaysItem = ({day}:{day: WorkingDay}) => {
  const updateIsOpen = useWorkingDays((state) => state.updateIsOpen)
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningEditModal = () => openModal(<BusinessOnboardingWorkingDaysEditModal day={day}/>)
  
  return (
    <div className="h-12 flex flex-row items-center px-3 rounded-xl bg-[#F6F7FB] border-[0.5px] border-[#D4D4D4]">
      <div className="w-full flex flex-row items-center gap-3">
        <input 
          type="checkbox" 
          defaultChecked={day.isOpen} 
          onChange={(e)=>{updateIsOpen(day.dayOfWeek, e.target.checked)}}
        />
        <p className="font-normal text-main-black text-sm">{day.dayOfWeek}</p>
      </div>
      
      <div className="w-full flex flex-row items-center gap-10">
        <p className="w-full text-right text-sm text-main-black font-light ">{day.isOpen ? `${day.open} - ${day.close}` : "Nieczynne"}</p>
        {day.isOpen && 
          <Edit 
            color="#333" 
            strokeWidth={1} 
            size={27} 
            className="hover:cursor-pointer hover:stroke-[#333333] active:scale-0.9"
            onClick={handleOpeningEditModal}
          />
        }
      </div>
    </div>
  );
};

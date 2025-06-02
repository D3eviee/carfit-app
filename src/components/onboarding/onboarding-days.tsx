'use client'
import { FormButton } from "../form-button";
import { useState } from "react";
import useWorkingDays, { useContainerErrorStore, useOnboardingStore } from "@/lib/store";
import { OnboardingEditHoursModal } from "./onboarding-edit-hours-modal";
import { useRouter } from "next/navigation";
import { WorkingDay } from "@/lib/types";
import { createBusinessAccount } from "@/app/(auth)/actions";
import { OnboardingDaysItem } from "./onboarding-days-item";

export default function OnboardingWorkingDays() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [editedDay, setEditedDay] = useState<WorkingDay>({ isOpen: false, dayOfWeek: "", open: "", close: "" })
  const workingDays = useWorkingDays((state) => state.days);
  const businessData = useOnboardingStore((state) => state)
  const setData = useOnboardingStore((state)=> state.resetData)

  const setContainerError = useContainerErrorStore(state => state.setContainerError)
  
  const handleOpeningModal = (day:WorkingDay) => {
    setOpenModal(true);
    setEditedDay(day)
  }

  const handleClosingModal = () => {
    setOpenModal(false);
    setEditedDay({ isOpen: false, dayOfWeek: "", open: "", close: "" })
  }

  const handleSubmit = async () => {
      
      const result = await createBusinessAccount(businessData, workingDays)
      if(result.status == "failed"){
        setContainerError(result.message!)
      }
      else{
        setData()
        router.push('/dashboard')
        setContainerError("Success. Registration copleted!")
      }      
  }

  return (
    <>
      {/* Modal for editing working hours */}
      {openModal &&  <OnboardingEditHoursModal day={editedDay} close={handleClosingModal}/>}

      <div>      
        <div>
          {workingDays.map((day, key)=> (
            <OnboardingDaysItem
            key={key} 
            day={day} 
            onClick={()=>handleOpeningModal(day)} />)
          )}
        </div>

        <FormButton label="Załóż konto" onClick={handleSubmit}/>
      </div>
    </>
  )
}
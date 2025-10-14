'use client'
import { useWorkingDays, useBusinessOnboardingStore, useToastStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { BusinessoOnboardingWorkingDaysItem } from "./business-onboarding-working-days-item";
import { BusinessOnboardingButton } from "./business-onboarding-button";
import { createBusinessAccount } from "@/app/(auth)/business/onboarding/actions";

export const BusinessOnboardingWorkingDays = () => {
  const router = useRouter()
  const showToast = useToastStore(store => store.showToast)
  const workingDays = useWorkingDays((state) => state.days);
  const businessOnboardingData = useBusinessOnboardingStore(store => store)
  const resetData = useBusinessOnboardingStore(store=> store.resetData)

  const handleSubmit = async () => {
      const result = await createBusinessAccount(businessOnboardingData, workingDays)
      if(!result.success){
        showToast(result.message, "error")
        return
      }

      router.push('/dashboard')
      showToast(result.message, "success")
      resetData()
  }

  return (   
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-2">
        { workingDays.map((day, index) => <BusinessoOnboardingWorkingDaysItem key={index} day={day}/> )}
      </div>  
      <BusinessOnboardingButton label="Załóż konto" onClick={handleSubmit}/>
    </div>
  )
}
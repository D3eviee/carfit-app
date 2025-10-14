"use client";
import { useState } from "react";
import { BusinessOnboardingNav } from "@/components/auth/business/business-onboarding-nav";
import { BusinessOnboardingFormHeader } from "@/components/auth/business/business-onboarding-form-header";
import { BusinessOnboardingEmail } from "@/components/auth/business/business-onboarding-email";
import { BusinessOnboardingCategory } from "@/components/auth/business/business-onboarding-category";
import { BusinessOnboardingInformation } from "./business-onboarding-information";
import { BusinessOnboardingAdress } from "@/components/auth/business/business-onboarding-adress";
import { BusinessOnboardingAbout } from "@/components/auth/business/business-onboarding-about";
import { BusinessOnboardingWorkingDays } from "@/components/auth/business/business-onboarding-working-days";

export const BusinessOnboardingForm = () => {
    const [activePage, setActivePage] = useState<number>(0)
    const handleNextStep = () => setActivePage((prev) => prev + 1)
    const handlePreviousStep = () => setActivePage((prev) => prev - 1)
    
    return (
        <div 
            className="w-full h-full flex flex-col items-center justify-center px-8 gap-8 sm:w-[430px]  sm:border-[0.5px] sm:border-[#D4D4D4] sm:py-12 sm:px-10 sm:h-fit sm:rounded-4xl sm:shadow-lg"
        >
            {/*NAVIGATION*/}
            {activePage != 0 &&  <BusinessOnboardingNav prevStepFn={handlePreviousStep} />}
            {/*HEADER*/}
            <BusinessOnboardingFormHeader formPage={activePage}/>

            {activePage == 0 && <BusinessOnboardingEmail onNextStepFn={handleNextStep}/>}
            {activePage == 1 && <BusinessOnboardingCategory onNextStepFn={handleNextStep}/>}
            {activePage == 2 && <BusinessOnboardingInformation onNextStepFn={handleNextStep} />}
            {activePage == 3 && <BusinessOnboardingAdress onNextStepFn={handleNextStep} />}
            {activePage == 4 && <BusinessOnboardingAbout onNextStepFn={handleNextStep} />}
            {activePage == 5 && <BusinessOnboardingWorkingDays />}
        </div>
    )
}
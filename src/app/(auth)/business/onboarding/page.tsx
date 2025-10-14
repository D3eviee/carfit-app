"use client";
import Link from "next/link";
import { BackButton } from "@/components/buttons/back-button";
import { BusinessOnboardingForm } from "@/components/auth/business/business-onboarding-form";
import { BusinessOnboardingImage } from "@/components/auth/business/business-onboarding-image";

export default function BusinessOnboarding() {
  return(
    <div className="w-full h-full flex flex-row overflow-hidden">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:top-10 lg:left-10">
          <Link href="/business"> 
            <BackButton /> 
          </Link>
        </div>
        <BusinessOnboardingForm/>
      </div>
      <BusinessOnboardingImage/>
    </div>   
  )
}


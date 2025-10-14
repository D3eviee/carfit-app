'use client'
import { ClientOnboardingForm } from "@/components/auth/client/client-onboarding-form";
import { ClientOnboardingImage } from "@/components/auth/client/client-onboarding-image";
import { BackButton } from "@/components/buttons/back-button";
import Link from "next/link";

export default function ClientOnboarding() {
  return (
    <div className="w-full h-screen flex flex-row overflow-hidden">
      <div className="w-full flex flex-col items-center mt-30">
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:top-10 lg:left-10">
          <Link href="/"> 
            <BackButton/> 
          </Link>
        </div>
        <ClientOnboardingForm/>
      </div>
      <ClientOnboardingImage/>
    </div>
  )
}

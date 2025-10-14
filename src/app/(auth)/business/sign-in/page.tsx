'use client'
import { ClientOnboardingImage} from "@/components/auth/client/client-onboarding-image";
import { BackButton } from "@/components/buttons/back-button";
import Link from "next/link";
import { BusinessLoginForm } from "@/components/auth/business/business-login-form";

export default function BusinessSignIn() {
  return (
    <div className="w-full h-full flex flex-row overflow-hidden">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:top-10 lg:left-10">
          <Link href="/business"> 
            <BackButton /> 
          </Link>
        </div>
        <BusinessLoginForm/>
      </div>
      <ClientOnboardingImage/>
    </div>
  )
}
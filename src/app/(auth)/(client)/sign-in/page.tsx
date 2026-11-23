'use client'
import { ButtonBack } from "@/components/buttons/ButtonBack";
import Link from "next/link";
import { ClientLoginForm } from "@/components/auth/client/client-login-form";
import { ClientOnboardingImage } from "@/components/auth/client/client-onboarding-image";

export default function ClientSignIn() {
  return (
    <div className="w-full h-full flex flex-row overflow-hidden">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:top-10 lg:left-10">
          <Link href="/"> 
            <ButtonBack/> 
          </Link>
        </div>
        <ClientLoginForm/>
      </div>
      <ClientOnboardingImage/>
    </div>
  )
}
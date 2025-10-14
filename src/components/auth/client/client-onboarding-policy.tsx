'use client'
import { OnboardingClientPolicyModal } from "@/components/modals/onboarding-client-policy-modal";
import { useModalStore } from "@/lib/store";
import Link from "next/link";

export const ClientOnboardingPolicy = () =>  {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningPolicy = () => openModal(<OnboardingClientPolicyModal/>)

  return (
    <div className="flex flex-col gap-8">
      <p className="text-xs text-[#333] text-pretty font-extralight tracking-wide">Klikając <b>Utwórz konto</b> potwierdzasz, że przeczytałeś, rozumiesz i zgadzasz się z naszą<span onClick={handleOpeningPolicy} className="text-xs font-normal text-[#333] hover:cursor-pointer hover:text-black"> Polityką i regulaminem</span></p>
      <p className="text-center text-[#333] text-sm font-light">Masz już konto?<Link href='/sign-in'><span className="text-[#007AFF] font-semibold"> Zaloguj</span></Link></p>
    </div> 
  )
}
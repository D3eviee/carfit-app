import Link from "next/link"

export const BusinessSwitchForm = () => {
  return(
    <div className="w-full flex flex-col gap-1 justify-center items-center">
      <p className="text-center text-main-black text-sm font-light">Nie posiadasz konta dla swojego biznesu?</p>
      <Link href='/business/onboarding' className="text-[#007AFF] text-sm font-semibold">Utwórz konto </Link>
    </div>
  )
}


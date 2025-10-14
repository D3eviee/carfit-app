import Link from "next/link"

export const LoginClientToOnboarding = () => {
  return(
    <p className="text-center text-[#333] text-sm font-light">Nie masz konta?
      <Link href='/onboarding'><span className="text-[#007AFF] font-semibold"> Utwórz</span></Link>
    </p>
  )
}


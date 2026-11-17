import { ReactNode } from "react"

type LandingSectionProps = {
  title: string
  children: ReactNode
}

export const LandingSection = ({ title, children }: LandingSectionProps) => {
  return (
    <section className="flex flex-col gap-4 lg:gap-5">
      <h2 className="text-xl font-bold text-main-black lg:text-2xl lg:font-semibold">{title}</h2>
      {children}
    </section>
  )
}
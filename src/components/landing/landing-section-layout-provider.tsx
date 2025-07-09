import { ReactNode } from "react"

export default function LandingSectionLayoutProvider({children, sectionHeader }:{children: ReactNode, sectionHeader:string}) {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
        <h3 className="text-lg text-[#111] font-medium lg:font-semibold lg:text-2xl">{sectionHeader}</h3>
        {children}
    </div>
    )
}

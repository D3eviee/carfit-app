import { ReactNode } from "react"

export default function LandingSectionLayoutProvider({children, sectionHeader }:{children: ReactNode, sectionHeader:string}) {
  return (
    <div className="flex flex-col gap-8">
        <h3 className="font-md text-[#333] text-xl lg:text-2xl">{sectionHeader}</h3>
        {children}
    </div>
    )
}

import { ReactNode } from "react"

export const LandingSectionLayoutProvider = ({children, sectionHeader }:{children: ReactNode, sectionHeader:string}) =>  {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
        <h1 className="text-xl text-main-black font-bold lg:font-semibold lg:text-2xl">{sectionHeader}</h1>
        {children}
    </div>
    )
}

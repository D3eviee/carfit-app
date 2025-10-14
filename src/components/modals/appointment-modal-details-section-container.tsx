import { ReactNode } from "react"
 
export const AppointmentModalDetailsSectionContainer = ({title, children}:{title: string, children:ReactNode}) => {
  return (
    <div className="w-full flex flex-col gap-4 p-6 bg-[#FFF] rounded-3xl border-1 border-[#E6E6E6]">
      <h1 className="text-middle font-medium leading-none">{title}</h1>
      {children}
    </div>
  )
}


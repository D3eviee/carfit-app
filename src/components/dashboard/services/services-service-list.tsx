import { ReactNode } from "react";

export const ServicesServiceList = ({categoryName, children}:{categoryName:string, children: ReactNode}) =>  {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="px-3 py-3 border-1 border-[#E6E6E6] rounded-xl">
        <p className="text-main-black text-middle font-semibold leading-none">{categoryName}</p>
      </div>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  )
}
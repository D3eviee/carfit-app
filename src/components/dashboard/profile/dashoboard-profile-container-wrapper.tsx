import { ReactNode } from "react";

export const DashboardProfileContainerWrapper = ({children}:{children:ReactNode}) => {
    return (
        <div className="w-full px-4 py-6  border-2 border-[#F2F2F7] rounded-3xl shadow-xs">
            {children}
        </div>
  )
}
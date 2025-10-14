import { ReactNode } from "react";

export const UserProfileContainerWrapper = ({children}:{children:ReactNode}) => {
    return (
        <div className="w-full px-4 py-6 border-2 border-[#F2F2F7] rounded-3xl shadow-xs">
            {children}
        </div>
  )
}
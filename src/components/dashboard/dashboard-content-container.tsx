import { ReactNode } from "react";

export default function DashboardContentContainer({children}: {children: ReactNode}){
    return(
        <div className="w-full h-full flex flex-col grow min-h-0 px-4 lg:px-4 lg:pb-6 lg:pt-14 xl:px-10 overflow-hidden">
            {children}
        </div>
    )
}


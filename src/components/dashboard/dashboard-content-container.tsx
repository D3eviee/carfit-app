import { ReactNode } from "react";

export default function DashboardContentContainer({children}: {children: ReactNode}){
    return(
        <div className="w-full h-full flex flex-col flex-grow min-h-0 px-4 py-4 lg:px-10 lg:py-20">
            {children}
        </div>
    )
}


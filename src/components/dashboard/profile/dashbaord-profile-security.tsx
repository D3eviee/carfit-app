'use client'
import { DashboardProfileSecurityEditButton } from "./dasboard-profile-security-edit-button"
import { DashboardProfileContainerWrapper } from "./dashoboard-profile-container-wrapper"

export const DashboardProfileSecurity = () => {
    return (
        <DashboardProfileContainerWrapper>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <DashboardProfileSecurityEditButton/> 
                </div>
                <div className="w-full flex flex-col gap-2 px-2">
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Hasło</p>
                        <p className="font-base">************</p>
                    </div>
                </div>
            </div>  
        </DashboardProfileContainerWrapper>
  )
}
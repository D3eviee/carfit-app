'use client'
import { UserProfileContainerWrapper } from "./user-profile-container-wrapper"
import { UserProfileSecutityEditButton } from "./user-profile-security-edit-button"

export const UserProfileSecurity = () => {
    return (
       <UserProfileContainerWrapper>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <UserProfileSecutityEditButton/> 
                </div>
                <div className="w-full flex flex-col gap-2 px-2">
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Hasło</p>
                        <p className="font-base">************</p>
                    </div>
                </div>
            </div>  
        </UserProfileContainerWrapper>
  )
}
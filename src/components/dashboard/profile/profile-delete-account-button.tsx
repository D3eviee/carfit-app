'use client'
import { useState } from "react"
import { ProfileDeleteAccountModal } from "./profile-delete-account-modal"

export const ProfileDeleteAccountButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div 
                className="mt-5  w-fit bg-[#F2F4F8] border border-[#D4D4D4] text-sm font-normal text-[#333] px-4 py-1 rounded-md hover:cursor-pointer"
                onClick={() => setIsOpen(true)}    
            >Usuń konto</div>
            <ProfileDeleteAccountModal  open={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}

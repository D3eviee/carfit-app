'use client'
import { useState } from "react"
import { ProfileChangePasswordModal } from "./profile-change-password-modal"

export const ProfileChangePasswordButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div 
                className="bg-[#111] text-sm font-medium text-white px-4 py-1 rounded-md hover:cursor-pointer hover:bg-[#333]"
                onClick={() => setIsOpen(true)}    
            >Zmień</div>
            <ProfileChangePasswordModal  open={isOpen} onClose={() => setIsOpen(false)} />
        </>
        
    )
}
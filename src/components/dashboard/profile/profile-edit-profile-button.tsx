'use client'
import { useState } from "react"
import { ProfileEditProfileModal } from "./profile-edit-profile-modal"

type ProfileEditProfileButtonProps = {
    profileData: {
        email: string
        name: string
        phone: string
    }
}

export const ProfileEditProfileButton = ({profileData}: ProfileEditProfileButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div 
                className="bg-[#111] text-sm font-medium text-white px-4 py-1 rounded-md hover:cursor-pointer hover:bg-[#333]"
                onClick={() => setIsOpen(true)}    
            >Edytuj</div>
            <ProfileEditProfileModal open={isOpen} onClose={() => setIsOpen(false)} profileData={profileData}/>
        </>
    )
}
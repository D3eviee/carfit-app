'use client'
import { useState } from "react"
import ProfileEditProfileModal from "./profile-edit-profile-modal"

type ProfileHeaderEditButtonProps = {
    userData: {
        id: string
        phone: string
        email: string,
        image: string,
        name: string,                
    }
}

export default function ProfileHeaderEditButton({userData}: ProfileHeaderEditButtonProps){
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <> 
            <div 
                onClick={() => {setIsModalOpen(true)}}
                className="w-git text-center font-semibold text-sm px-16 py-3 rounded-xl bg-gradient-to-b from-[#313131] to-[#141414] shadow-md text-white hover:cursor-pointer hover:bg-[#333333]"
            >
                Edytuj profil
            </div>

            <ProfileEditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userData={userData}
            />
        </>
    )
}
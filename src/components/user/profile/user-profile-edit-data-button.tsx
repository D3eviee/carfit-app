'use client'
import { useModalStore } from "@/lib/store"
import UserProfileEditButton from "./user-profile-edit-button"
import { UserProfileDataEditModal } from "@/components/modals/user/profile/user-profile-data-edit-modal"

type UserProfileEditDataButtonProps = {
    userData: {
        id: string
        phone: string
        email: string,
        image: string,
        name: string,                
    }
}

export const UserProfileEditDataButton = ({userData}: UserProfileEditDataButtonProps) => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal(<UserProfileDataEditModal name={userData.name} phone={userData.phone} email={userData.email}/>)

    return ( <UserProfileEditButton  onClick={handleOpeningEdit}>Edytuj profil</UserProfileEditButton> )
}
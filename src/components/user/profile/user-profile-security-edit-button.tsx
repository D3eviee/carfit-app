'use client'
import { useModalStore } from "@/lib/store"
import UserProfileEditButton from "./user-profile-edit-button"
import { UserProfileSecurityEditModal } from "@/components/modals/user/profile/user-profile-security-edit-modal"

export const UserProfileSecutityEditButton = () => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal(<UserProfileSecurityEditModal/>)

    return ( <UserProfileEditButton onClick={handleOpeningEdit}>Zmień hasło</UserProfileEditButton> )
}
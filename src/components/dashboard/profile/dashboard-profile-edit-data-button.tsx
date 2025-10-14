'use client'
import { useModalStore } from "@/lib/store"
import { DashboardProfileEditButton } from "./dashboard-profile-edit-button"
import { DashboardProfileDataEditModal } from "@/components/modals/dashboard/profile/dashboard-profile-data-edit-modal"

type DashboardProfileEditDataButtonProps = {
    userData: {
        phone: string
        email: string,
        image: string,
        owner: string,                
    }
}

export const DashboardProfileEditDataButton = ({userData}: DashboardProfileEditDataButtonProps) => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal(<DashboardProfileDataEditModal owner={userData.owner} phone={userData.phone} email={userData.email}/>)

    return ( <DashboardProfileEditButton onClick={handleOpeningEdit}>Edytuj profil</DashboardProfileEditButton> )
}
'use client'
import { DashboardProfileSecurityEditModal } from "@/components/modals/dashboard/profile/dashboard-profile-security-edit-modal"
import { useModalStore } from "@/lib/store"
import { DashboardProfileEditButton } from "./dashboard-profile-edit-button"

export const DashboardProfileSecurityEditButton = () => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal( <DashboardProfileSecurityEditModal/>)

    return ( <DashboardProfileEditButton onClick={handleOpeningEdit}>Zmień hasło</DashboardProfileEditButton> )
}
'use client'
import { DashboardSettingsEditLocationModal } from "@/components/modals/dashboard/settings/dashboard-settings-edit-location-modal"
import { useModalStore } from "@/lib/store"
import { DashboardSettingEditButton } from "../dashboard-settings-edit-button"

type DashboardSettingsLocationEditButtonProps = {
    locationData: {
        town: string
        district: string
        street: string
        zipcode: string            
    }
}

export const DashboardSettingsLocationEditButton = ({locationData}: DashboardSettingsLocationEditButtonProps) => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal(<DashboardSettingsEditLocationModal  locationData={locationData} />)
    return ( <DashboardSettingEditButton onClick={handleOpeningEdit}/> )
}
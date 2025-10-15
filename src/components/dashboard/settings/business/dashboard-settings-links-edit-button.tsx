'use client'
import { useModalStore } from "@/lib/store"
import { DashboardSettingsEditLinksModal } from "@/components/modals/dashboard/settings/dashboard-settings-edit-links-modal"
import { DashboardSettingEditButton } from "../dashboard-settings-edit-button"

type DashboardSettingsLinksEditButtonProps = {
    linksData: {
        facebookUrl?: string 
        instagramUrl?: string 
        websiteUrl?: string          
    }
}

export const DashboardSettingsLinksEditButton = ({linksData}: DashboardSettingsLinksEditButtonProps) => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal( 
    <DashboardSettingsEditLinksModal facebookUrl={linksData.facebookUrl} instagramUrl={linksData.instagramUrl} websiteUrl={linksData.websiteUrl}/>
    )

    return ( <DashboardSettingEditButton onClick={handleOpeningEdit}/> )
}
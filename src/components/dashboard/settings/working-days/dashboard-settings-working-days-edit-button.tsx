'use client'
import { DashboardSettingsEditWorkingHoursModal } from "@/components/modals/dashboard/settings/dashboard-settings-edit-working-hours-modal"
import { useModalStore, useSettingsEditingWorkingHours } from "@/lib/store"
import { DashboardSettingEditButton } from "../dashboard-settings-edit-button"

type DashboardSettingWorkingDaysEditButtonProps = {
  workingHoursData: {
    dayOfWeek: string
    open: string
    close: string
    isOpen: boolean
  }[]
}

export const DashboardSettingWorkingDaysEditButton = ({workingHoursData}:DashboardSettingWorkingDaysEditButtonProps) => {
    const openModal = useModalStore(store => store.openModal)
    const setDays = useSettingsEditingWorkingHours(store => store.setDays)
    const handleOpeningEdit = () => {
      setDays(workingHoursData)
      openModal(<DashboardSettingsEditWorkingHoursModal/>)
    }

    return ( <DashboardSettingEditButton onClick={handleOpeningEdit}/>)
}
'use client'
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { DashboardSettingsWorkingDaysEditGrid } from "@/components/dashboard/settings/working-days/dashboard-settings-working-days-edit-grid";
import { useSettingsEditingWorkingHours } from "@/lib/store";
import { DashboardSettingSaveButton } from "./dashboard-settings-save-button";
import { useSettingsSaveBusinessWorkingHours } from "@/lib/hooks/dashboard/useSettingsSaveBusinessWorkingHours";

export const DashboardSettingsEditWorkingHoursModal = () => {
  const days = useSettingsEditingWorkingHours(store => store.days)
  const dayNames = days.map((item) => item.dayOfWeek)
  const {mutate, isPending} = useSettingsSaveBusinessWorkingHours()
  const handleSavingWorkingHours = () => mutate(days)
  
  return(
    <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[450px] sm:h-fit sm:rounded-4xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>
      <div className="px-4 flex flex-col gap-10">
        <DashboardSettingsWorkingDaysEditGrid days={dayNames}/>
        <DashboardSettingSaveButton type="button" onClick={handleSavingWorkingHours} isPending={isPending}/>
      </div>
    </div>
  )
}
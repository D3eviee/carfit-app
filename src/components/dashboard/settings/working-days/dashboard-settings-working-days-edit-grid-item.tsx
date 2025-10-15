import { useSettingsEditingWorkingHours } from "@/lib/store";
import { DashboardSettingsWorkingDaysEditGridItemSelect } from "./dashboard-settings-working-days-edit-grid-item-select";
import { DashboardSettingsWorkingDaysEditGridItemToggle } from "./dashboard-settings-working-days-edit-grid-item-toggle";

export const DashboardSettingsWorkingDaysEditGridItem = ({day}:{day:string}) => {
  const isOpen = useSettingsEditingWorkingHours((store) => store.days.find((d) => d.dayOfWeek === day).isOpen)

  return (
    <div className="w-full flex flex-col gap-2.5 px-2">
      <p className="text-sm text-main-black font-medium">{day}</p>
      <div className="w-full flex flex-row items-center justify-between min-h-9">
        {!isOpen && <p className="text-sm text-[#191919] font-normal">Nieczynne</p>}
        {isOpen && <DashboardSettingsWorkingDaysEditGridItemSelect day={day}/>}
        <DashboardSettingsWorkingDaysEditGridItemToggle day={day}/>
      </div>
    </div>
  )
}
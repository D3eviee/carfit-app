import { DashboardSettingsWorkingDaysGridItem } from './dashboard-settings-working-days-grid-item';

type WorkingHour = {
  dayOfWeek: string;
  open: string;
  close: string;
  isOpen: boolean;
}
  
type SettingsBusinessWorkHoursProps = {
  workingHoursData: WorkingHour[]
}

export const DashboardSettingsWorkingDaysGrid = ({workingHoursData}:SettingsBusinessWorkHoursProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
        {workingHoursData.map((day)=> <DashboardSettingsWorkingDaysGridItem key={day.dayOfWeek} day={day} /> )}
    </div>
    )
}
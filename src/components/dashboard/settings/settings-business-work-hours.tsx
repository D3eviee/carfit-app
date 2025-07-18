import SettingsBusinessWorkHoursItem from './settings-business-work-hours-item';

type WorkingHour = {
  id: string
  updatedAt: Date;
  serviceId: string;
  dayOfWeek: string;
  open: string;
  close: string;
  isOpen: boolean;
}
  
type SettingsBusinessWorkHoursProps = {
  workingHoursData: WorkingHour[];
}

export default function SettingsBusinessWorkHours({workingHoursData}:SettingsBusinessWorkHoursProps){
  return (
    <div className="w-full flex flex-col gap-3">
        {workingHoursData.map((day)=> <SettingsBusinessWorkHoursItem key={day.dayOfWeek} day={day} /> )}
    </div>
    );
}
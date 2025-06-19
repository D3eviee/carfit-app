import SettingsBusinessWorkHoursItemEditSelector from "./settings-business-work-hours-item-edit-selector";
import ToggleSwitch from "./settings-business-work-hours-item-edit-toggle";

type Day = {
  id: string
  updatedAt: Date;
  serviceId: string;
  dayOfWeek: string
  open: string;
  close: string;
  isOpen: boolean;
}

export default function SettingsBusinessWorkHoursItemEdit({day}:{day:Day} ) {
  return (
    <div className="w-full flex flex-col gap-4 p-4 rounded ring-1 ring-[#D4D4D4] md:flex-row md:justify-between">
      <h3 className="text-sm text-[#333] font-normal">{day.dayOfWeek}</h3>
      <div className="w-full flex flex-row items-center justify-between  md:w-2/3 lg:w-1/2">
        {!day.isOpen && <p className="text-sm text-[#333] font-normal">Nieczynne</p>}
        {day.isOpen && <SettingsBusinessWorkHoursItemEditSelector day={day.dayOfWeek} open={day.open} close={day.close}/>}
        <ToggleSwitch isOpen={day.isOpen} dayName={day.dayOfWeek}/>
      </div>
    </div>
  )
}
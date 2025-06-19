import SettingsBusinessWorkHoursItemEdit from "./settings-business-work-hours-item-edit";

type WorkingHour = {
  id: string
  updatedAt: Date
  serviceId: string
  dayOfWeek: string
  open: string
  close: string
  isOpen: boolean
}

type SettingsBusinessWorkHoursProps = {
  workingHoursData: WorkingHour[]
}

export default function SettingsBusinessWorkHoursEdit({workingHoursData}:SettingsBusinessWorkHoursProps){
  return (
    <div className="w-full flex flex-col gap-3">
      {workingHoursData.map((day)=> <SettingsBusinessWorkHoursItemEdit key={day.dayOfWeek} day={day} /> )}
    </div>
  )
}

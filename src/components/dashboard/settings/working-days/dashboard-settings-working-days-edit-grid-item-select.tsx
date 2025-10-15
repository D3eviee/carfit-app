'use client'
import { useSettingsEditingWorkingHours } from "@/lib/store";

export const DashboardSettingsWorkingDaysEditGridItemSelect = ({day}:{day:string}) => {
  //ZUSTAND STORE
  const updateOpenHour = useSettingsEditingWorkingHours(store => store.updateOpenHour)
  const updateCloseHour = useSettingsEditingWorkingHours(store => store.updateCloseHour)
  const open = useSettingsEditingWorkingHours((store) => store.days.find((d) => d.dayOfWeek === day).open)
  const close = useSettingsEditingWorkingHours((store) => store.days.find((d) => d.dayOfWeek === day).close)

  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 6; hour <= 21; hour++) {
      for (let min = 0; min < 60; min += 15) {
        const h = hour.toString().padStart(2, "0");
        const m = min.toString().padStart(2, "0");
        times.push(`${h}:${m}`);
      }
    }
    return times
  }
  const allOptions = generateTimeOptions()
  const filteredCloseOptions = allOptions.filter((time) => time > open);

  const handleOpenSelectOnChange = (value:string) => updateOpenHour(day, value)
  const handleCloseSelectOnChange = (value:string) => updateCloseHour(day, value)
  return (
    <div className="w-full flex flex-row gap-5">
      <select 
        className="ring-1 py-2 px-8 ring-[#D4D4D4]  rounded-xl text-center text-sm" 
        defaultValue={String(open)}
        onChange={(e) => handleOpenSelectOnChange(e.target.value)}
        >
        {allOptions.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <select 
        className="ring-1 py-1.5 px-8 ring-[#D4D4D4] rounded-xl text-center text-sm"
        defaultValue={close}
        onChange={(e) => handleCloseSelectOnChange(e.target.value)}
      >
        {filteredCloseOptions.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}

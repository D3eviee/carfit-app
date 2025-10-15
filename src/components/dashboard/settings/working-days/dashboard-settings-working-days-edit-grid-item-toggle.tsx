'use client'
import { useSettingsEditingWorkingHours } from "@/lib/store";

export const DashboardSettingsWorkingDaysEditGridItemToggle = ({day}: {day: string }) => {
  const toggleIsOpen = useSettingsEditingWorkingHours((store) => store.toggleIsOpen)
  const isOpen = useSettingsEditingWorkingHours((store) => store.days.find((d) => d.dayOfWeek === day)?.isOpen)
  const handleToggle = () => toggleIsOpen(day)

  return (
    <label className="relative cursor-pointer inline-block h-6.5">
    <input
      type="checkbox"
      className="sr-only"
      checked={isOpen}
      onChange={handleToggle}
    />
    <div
      className={`w-14 h-6 rounded-full transition-colors duration-300 ${isOpen ? "bg-[#31D158]" : "bg-gray-300"}`}
    />
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
        isOpen ? "translate-x-8" : ""
      }`}
    />
  </label>
  )
}
export const DashboardSettingsWorkingDaysGridItem = ({ day }) => {
    return (
      <div className="flex justify-between items-center p-4 rounded-2xl bg-[#FFF] border-[#D4D4D4] border-[1px]">
        <p className="text-sm text-main-black font-medium">{day.dayOfWeek}</p>
        <p className="text-sm  text-main-black font-light">{day.isOpen ? `${day.open} - ${day.close}` : "Zamknięte"}</p>
      </div>
    );
}
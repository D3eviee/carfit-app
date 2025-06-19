export default function SettingsBusinessWorkHoursItem({ day }) {
    return (
      <div className="flex justify-between items-center p-4 rounded ring-1 ring-[#D4D4D4]">
        <p className="text-sm text-[#333] font-normal">{day.dayOfWeek}</p>
        <p className="text-sm text-[#111] font-light">{day.isOpen ? `${day.open} - ${day.close}` : "Zamknięte"}</p>
      </div>
    );
}
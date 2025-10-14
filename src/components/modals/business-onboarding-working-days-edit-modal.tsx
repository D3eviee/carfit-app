import { useModalStore, useWorkingDays } from "@/lib/store";
import { WorkingDay } from "@/lib/types";
import { useState } from "react";
import { ExitModalButton } from "./exit-modal-button";

export const BusinessOnboardingWorkingDaysEditModal = ({day}:{ day: WorkingDay}) => {
  const closeModal = useModalStore(store => store.closeModal)
  const updateWorkingHours = useWorkingDays((state) => state.updateWorkingHours);
  const [selectedOpen, setSelectedOpen] = useState(day.open);
  const [selectedClose, setSelectedClose] = useState(day.close)

  const hours = Array.from({ length: (21 - 6 + 1) * 4 }, (_, i) => {
    const totalMinutes = 6 * 60 + i * 15;
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  })

  const availableCloseHours = hours.filter(h => h > selectedOpen)

  const handleSave = () => {
    updateWorkingHours(day.dayOfWeek, selectedOpen, selectedClose)
    closeModal()
  }

  return (
    <div className="w-[420px] flex flex-col gap-8 px-4 pb-4 pt-6 bg-[#FFF] rounded-4xl">
      {/*HEADER*/}
      <p className="w-full text-main-black text-sm text-center font-medium">{day.dayOfWeek}</p>
      {/*INPUTS*/}
      <div className="w-full px-2 flex justify-between items-center ">
        <p className="w-full text-sm tracking-tight text-[#191919] font-normal ">Godziny otwarcia</p>
        <div className="w-full flex flex-row justify-center gap-3">
          <div className="before:content-['START'] before:absolute before:text-[9px] before:text-[#727377] before:font-normal before:p-px before:bg-white before:z-10 before:translate-x-[5px] before:translate-y-[-8px]">
            <select
              id="openTime"
              value={selectedOpen}
              className="rounded-xl py-2 px-4 w-24 text-center text-main-black border-[0.5px] border-[#727377] bg-[#FFF] outline-none"
              onChange={(e) => {
                const newOpen = e.target.value;
                setSelectedOpen(newOpen);
                if (selectedClose <= newOpen) {
                  const laterOption = hours.find(h => h > newOpen)
                  if (laterOption) setSelectedClose(laterOption)
                }
              }}
            >
              {hours.map(hour => <option key={hour} value={hour}>{hour}</option> )}
          </select>  
        </div>
          <div className="before:content-['KONIEC'] before:absolute before:text-[9px] before:text-[#727377] before:font-normal before:p-px before:bg-white before:z-10 before:translate-x-[5px] before:translate-y-[-8px]">
            <select
              id="closeTime"
              value={selectedClose}
              className="rounded-xl py-2 px-4 w-24 text-center text-main-black border-[0.5px] border-[#727377] bg-[#FFF] outline-none"
              onChange={(e) => setSelectedClose(e.target.value)}
            >
              {availableCloseHours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

        {/*LOWER BUTTONS*/}
      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton/>

        <button 
          type="button"
          onClick={handleSave}
          className="w-full text-center justify-center py-2.5 bg-main-black rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#222] active:scale-xs transition duration-75"
        >
          <p className="text-white">Zapisz</p>
        </button>
    </div>
  </div>
  );
}
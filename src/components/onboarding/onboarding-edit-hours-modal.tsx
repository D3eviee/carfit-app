import useWorkingDays from "@/lib/store";
import { WorkingDay } from "@/lib/types";

export const OnboardingEditHoursModal = ({ day, close = () => {} }: { day: WorkingDay, close: () => void; }) => {
  const updateOpenHour = useWorkingDays((state) => state.updateOpenHour);
  const updateCloseHour = useWorkingDays((state) => state.updateCloseHour);
  const inputsValues = {open: day.open, close: day.close}

    const handleSave = () => {
        updateOpenHour(day.dayOfWeek, inputsValues.open);
        updateCloseHour(day.dayOfWeek, inputsValues.close);
        close()
    }

  return (
    <div>
      <div className="absolute w-full h-full bg-[#111] top-0 left-0 opacity-80" />
      <div className="absolute w-[370px] bg-[#FFF] top-1/2 left-1/2 rounded-lg translate-y-[-50%] translate-x-[-50%] lg:left-[25%]">
        {/*HEADER*/}
        <div className="flex justify-center items-center border-b-[0.5px] border-b-[#CCC] py-2">
          <h3 className="text-[#111] text-xs/3 font-normal mt-1 ">{day.dayOfWeek}</h3>
        </div>
        {/*INPUTS*/}
        <div className="px-5 py-6 flex justify-between items-center">
          <p className="text-sm text-[#333] font-medium ">Godziny otwarcia</p>
          <div className="flex gap-3">
            <div className="before:content-['START'] before:absolute before:text-[9px] before:text-[#AAAAAA] before:font-normal before:p-[1px] before:bg-white before:z-10 before:translate-x-[5px] before:translate-y-[-8px]">
              <input
                type="text"
                placeholder="7:00"
                className="py-1 px-4 w-20 text-center text-[#333333] border border-[#AAAAAA] rounded-md"
                defaultValue={inputsValues.open}
                onBlur={(e)=>{inputsValues.open = e.target.value}}
              />
            </div>
            <div className="before:content-['KONIEC'] before:absolute before:text-[9px] before:text-[#AAAAAA] before:font-normal before:p-[1px] before:bg-white before:z-10 before:translate-x-[5px] before:translate-y-[-8px]">
              <input
                type="text"
                placeholder="20:00"
                className="py-1 px-4 w-20 text-center text-[#333333] border border-[#AAAAAA] rounded-md "
                defaultValue={inputsValues.close}
                onBlur={(e)=>{inputsValues.close = e.target.value}}
              />
            </div>
          </div>
        </div>
        {/*LOWER BUTTONS*/}
        <div className="pb-5 flex justify-end gap-5 px-5 text-sm text-white m-0 font-medium">
          <div
            className="bg-[#D05151] py-[5px] px-[10px] rounded-[5px] shadow-[0px_2px_4px_0px_#AAAAAA70] hover:cursor-pointer hover:bg-[#C04040]"
            onClick={close}
          >Anuluj
          </div>
          <div
            className="bg-[#111111] py-[5px] px-[10px] rounded-[5px] shadow-[0px_2px_4px_0px_#AAAAAA70] hover:cursor-pointer hover:bg-[#222222]"
            onClick={handleSave}
          >Zapisz
          </div>
        </div>
      </div>
    </div>
  );
};

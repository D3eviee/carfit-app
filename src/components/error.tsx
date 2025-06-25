import { MessageCircleWarning } from "lucide-react";

export const Error = ({message}: {message?: string}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-[#EC695C] border-[0.5px] border-[#DB584B] flex flex-col gap-3 px-3 py-2 rounded-md ">
        <div className="flex flex-row items-center gap-1 justify-center">
          <MessageCircleWarning size={15} strokeWidth={1.5} color="#FFF"/>
          <h1 className="text-center text-xs font-normal text-white leading-none text-shadow-md">Błąd</h1>
        </div>
        <p className="text-center  text-xs font-light text-white  leading-none text-shadow-md">{message || "Podczas ładowania wystąpił błąd. Spróbuj ponownie"}</p>
      </div>
    </div>
  )
}
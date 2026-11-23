"use client";
import { ChevronLeft } from "lucide-react";

export const ButtonBack = ({ onBackFn }: { onBackFn: () => void }) => {
  return (
    <button
      type="button"
      aria-label="Wstecz"
      onClick={onBackFn}

      className="w-fit bg-[#F2F2F7]/30 backdrop-blur-xs ring-1 ring-white shadow-sm rounded-full inset-shadow-glass p-2 cursor-pointer hover:bg-[#FAFAFA]/30 hover:scale-105 active:scale-95 transition duration-75 ease-in"
    >
      <ChevronLeft color={"#191919"} size={25} strokeWidth={1.5}/>
    </button>
  )
}

"use client";
import { X } from "lucide-react";

export const ButtonClose = ({ onCloseFn }: { onCloseFn: () => void }) => {
  return (
    <button
      type="button" 
      aria-label="Zamknij"
      onClick={onCloseFn}
      className="w-fit bg-[#F2F2F7]/30 backdrop-blur-xs ring-1 ring-white rounded-full inset-shadow-glass p-2 cursor-pointer hover:bg-[#FAFAFA]/30 hover:scale-105 active:scale-95 transition duration-75 ease-in"
    >
      <X color={"#191919"} size={25} strokeWidth={1.5}/>
    </button>
  )
}
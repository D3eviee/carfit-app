'use client'
import { ButtonHTMLAttributes, ReactNode } from "react";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
  children: ReactNode
}

export const AddButton = ({children, ...props}:AddButtonProps) =>  {
  return (
    <button 
      type="button"
      onClick={props.onClick}
      className="py-1.5 px-4 text-sm text-white bg-main-black rounded-xl shadow-sm outline-none hover:cursor-pointer hover:bg-[#333] active:scale-xs"
    >
        { children }
    </button>
  )
}
'use client'
import { Spinner } from "@/components/spinner"
import { ButtonHTMLAttributes } from "react"

interface DashboardProfileModalSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
  isPending: boolean
}

export const DashboardProfileModalSubmitButton = ({isPending, ...props}:DashboardProfileModalSubmitButtonProps) => {
  return (
    <button
      type="submit" 
      disabled={props.disabled}
      className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
    >
      {isPending ? <Spinner/> : "Zapisz"}
    </button> 
  )
}
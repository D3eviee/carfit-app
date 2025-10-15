'use client'
import { Spinner } from "@/components/spinner"

interface DashboardSettingSaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  isPending:boolean
}

export const DashboardSettingSaveButton = ({isPending, ...props}:DashboardSettingSaveButtonProps) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className="w-full text-center font-semibold text-sm py-3 rounded-2xl bg-main-black shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#555] disabled:cursor-not-allowed active:scale-[0.98]" 
    >
      {isPending ? <Spinner color="#FFF"/> : "Zapisz" } 
    </button> 
  )
}
'use client'
import { ButtonHTMLAttributes, ReactNode } from "react"

interface DashboardProfileEditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
  children: ReactNode
}

export const DashboardProfileEditButton = ({children, ...props}: DashboardProfileEditButtonProps) => {
    return (
        <button 
            type="button"
            onClick={props.onClick}
            className="w-fit text-center text-sm px-4 py-2 rounded-2xl bg-linear-to-b from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333]"
        >
            {children}
        </button>
    )
}
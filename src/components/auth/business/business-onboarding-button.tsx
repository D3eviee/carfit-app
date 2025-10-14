import { Spinner } from "@/components/spinner"
import { ButtonHTMLAttributes } from "react"

interface BusinessOnboardingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export const BusinessOnboardingButton = ({label, disabled, onClick }: BusinessOnboardingButtonProps) => {
    return (
        <button 
            type="submit" 
            disabled={disabled}
            className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-xs" 
            onClick={onClick}
        >
            {disabled ? <Spinner/> : `${label}`}
        </button>
    )
}
'use client'
import { useSettingsIsPublicSwitch } from "@/lib/hooks/dashboard/useSettingsIsPublicSwitch"

export const DashboardSettingsVisibilityToggle = ({ isDisabled, isPublic }:{ isPublic: boolean, isDisabled: boolean }) => {
    const { mutate, isPending } = useSettingsIsPublicSwitch()
    const handleToggle = () => mutate(isPublic)
    
    return (
        <label className="relative cursor-pointer inline-block h-6.5">
            <input 
                type="checkbox" 
                className="sr-only" 
                checked={isPublic} 
                disabled={isDisabled || isPending}
                onChange={handleToggle}
            />
            <div
                className={`w-14 h-6 rounded-full transition-colors duration-300 ${
                isPublic ? "bg-[#31D158]" : "bg-gray-300"
                }`}
            />
            <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 
                ${ isPublic ? "translate-x-8" : "" }`}
            />
        </label>
    )
}
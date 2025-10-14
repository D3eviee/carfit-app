'use client'
import { cn } from "@/utils"

export const UserAnnouncmentStatusTag = ({ status }:{ status: string }) => {
    const statusLabel = status == "open" ? "Otwarte" : (status == "canceled" ? "Anulowane" : "Zakończone")

    return (
        <div 
            className={cn("px-3 py-1 rounded-lg w-fit h-fit", 
                statusLabel == "Otwarte" && "bg-[#49D968]",
                statusLabel == "Zakończone" && "bg-[#1E6EF3]",
                statusLabel == "Anulowane" && "bg-[#FE6265]")}
        >
            <p className="text-white font-bold text-xs">{statusLabel}</p>
        </div>       
  )
} 
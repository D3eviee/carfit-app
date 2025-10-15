'use client'
import { cn } from "@/utils"
import { Check, X } from "lucide-react"
import Link from "next/link"

export const DashboardSettingsVisibilityRequirements = ({imageCount, serviceCount}:{imageCount:number, serviceCount:number}) => {
  return (
    <div className="flex flex-col gap-5">
        <p className='text-md text-main-black'>Z myślą o zapewnieniu państwa klientom, jak najlepszej usługi rezerwacji, w celu udostępnienia biznesu zakończona musi zostać podstawowa konfiguracja konta: </p>
        <div className="flex flex-col gap-3 px-2">
            <div className="flex flex-row justify-between items-center">
                <div className='flex flex-row gap-2'>
                    {imageCount >= 3 ? <Check color="green" strokeWidth={3} /> : <X color="#FF383C" strokeWidth={3}/> }
                    <p className={cn("text-md font-medium", imageCount >= 3 ? "text-green-800" : "text-[#FF383C]") }>Ilość zdjęć w galerii {imageCount}/3</p>
                </div>
                <Link
                 href="/dashboard/settings/gallery"
                 className="w-fit px-3 py-1 rounded-lg hover:bg-[#F2F2F7] active:scale-105 hover:cursor-pointer"
                >
                    <p className="text-xs text-[#242426] font-medium">Zarządzaj galerią</p>
                </Link>
                
            </div>
            
            <div className="flex flex-row justify-between items-center">
                <div className='flex flex-row gap-2'>
                    {serviceCount >= 1 ? <Check color="green" strokeWidth={3}/> : <X color="#FF383C" strokeWidth={3}/> }
                    <p className={cn("text-md font-medium", serviceCount >= 1 ? "text-green-800" : "text-[#FF383C]") }>Ilość dodanych usług {serviceCount}/1</p>
                </div>
                <Link
                 href="/dashboard/services"
                 className="w-fit px-3 py-1 rounded-lg hover:bg-[#F2F2F7] active:scale-105 hover:cursor-pointer"
                >
                    <p className="text-xs text-[#242426] font-medium">Dodaj usługi</p>
                </Link>
            </div>
        </div>
    </div>          
  )
}
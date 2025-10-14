'use client'
import { UserProfileCarEditModal } from "@/components/modals/user/profile/user-profile-car-edit-modal";
import { useModalStore } from "@/lib/store";
import { Car } from "lucide-react"

type UserProfileCarsItemProps = {
  car: {
    id: string
    model: string
    brand: string
    year: number            
  }
}

export const UserProfileCarsItem = ({car}:UserProfileCarsItemProps) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () => openModal(<UserProfileCarEditModal car={car}/>)

  return (
    <div 
      onClick={handleOpeningModal}
      className="px-4 py-2 flex flex-row border-[0.5px] border-[#D4D4D4] rounded-xl items-center justify-between hover:bg-[#F9FAFC]  hover:cursor-pointer"
    >
      <div className="relative w-16 h-16 flex items-center">
        <Car size={42} strokeWidth={1.5}/>
      </div>
      
      <div className="flex flex-col gap-1 items-end">
        <p className="text-main-black text-lg font-medium leading-none">{car.brand} {car.model}</p>
        <p className="text-[#2B2B2B] text-sm leading-none">{car.year}</p>
      </div>
    </div>
  )
}
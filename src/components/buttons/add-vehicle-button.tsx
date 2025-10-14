'use client'
import { useModalStore } from "@/lib/store"
import { Plus } from "lucide-react"
import { UserProfileAddCarModal } from "../modals/user/profile/user-profile-car-add-modal"

export const AddVehicleButton = () => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal(<UserProfileAddCarModal/>)

    return (
        <div 
            onClick={handleOpeningEdit}
            className="w-fit text-center text-sm px-1 py-1 rounded-xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333]"
        >
            <Plus size={22} strokeWidth={1.5}/>
        </div>
    )
}
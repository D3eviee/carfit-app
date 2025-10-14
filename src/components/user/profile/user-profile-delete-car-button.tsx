'use client'
import { UserProfileCarDeleteModal } from "@/components/modals/user/profile/user-profile-car-delete-modal"
import { useModalStore } from "@/lib/store"

export default function UserProfileDeleteCarButton({carId}:{carId: string}){
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningDeleteModal = () => openModal(<UserProfileCarDeleteModal carId={carId}/>)

    return (
        <div 
            onClick={handleOpeningDeleteModal}
            className="mt-4 w-fit px-3 py-1 mx-auto rounded-2xl text-[#FF453A] text-middle hover:cursor-pointer hover:bg-[#F2F2F7] hover:text-[#EE564B] active:bg-[#F2F2F7] active:scale-105"
        >
            Usuń pojazd
        </div>
    )
}
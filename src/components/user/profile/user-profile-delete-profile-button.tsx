'use client'
import {UserProfileDeleteAccountModal} from "@/components/modals/user/profile/user-profile-delete-account-modal"
import { useModalStore } from "@/lib/store"

export const UserProfileDeleteProfileButton = () => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningDeleteModal = () => openModal(<UserProfileDeleteAccountModal/>)

    return (
        <div 
            onClick={handleOpeningDeleteModal}
            className="mt-4 w-fit px-3 py-1 mx-auto rounded-2xl text-[#FF453A] text-middle hover:cursor-pointer hover:bg-[#F2F2F7] active:scale-105"
        >
            Usuń konto
        </div>
    )
}
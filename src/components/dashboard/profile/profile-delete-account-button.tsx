'use client'
import { DashboardProfileDeleteAccountModal } from "@/components/modals/dashboard/profile/dashboard-profile-delete-account-modal"
import { useModalStore } from "@/lib/store"

export const DashboardProfileDeleteAccountButton = () => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningDeleteModal = () => openModal(<DashboardProfileDeleteAccountModal/>)

    return (
        <div 
            onClick={handleOpeningDeleteModal}
            className="mt-4 w-fit px-3 py-1 mx-auto rounded-2xl text-[#FF453A] text-middle hover:cursor-pointer hover:font-semibold hover:text-[#EE564B] active:bg-[#F2F2F7] active:scale-105"
        >
            Usuń konto
        </div>
    )
}
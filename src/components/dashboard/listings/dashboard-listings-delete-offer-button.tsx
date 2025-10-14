'use client'
import DashboardListingsDeleteOfferModal from "@/components/modals/dashboard-listings-delete-offer-modal"
import { useModalStore } from "@/lib/store"
export default function DashboardListingDeleteOfferButton({offerId}:{offerId:string}) {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningModal = () => openModal(<DashboardListingsDeleteOfferModal offerId={offerId}/>)
    
    return (
        <div 
            onClick={handleOpeningModal}
            className="w-full text-center text-middle py-1.5 bg-[#FF453A]  text-white rounded-xl hover:cursor-pointer hover:bg-[#333] active:scale-[0.99]"
        >
            Usuń
        </div>
  )
}
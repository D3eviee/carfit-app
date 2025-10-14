import { useActiveListingStore } from "@/lib/store"
import DashboardListingEditOfferButton from "./dashboard-listings-edit-offer-button"
import DashboardListingDeleteOfferButton from "./dashboard-listings-delete-offer-button"

export default function DashboardListingsDetailsViewOffer(){
  const activeOffering = useActiveListingStore(store => store.activeOffering)
  
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg text-main-black font-semibold px-2">Twoja oferta</h1>
      <div className="flex flex-col gap-4 bg-main-gray p-4 rounded-xl border-[0.5px] border-[#F2F2F7] inset-shadow-glass-sm">
        <p className="text-middle text-main-black font-light">{activeOffering.offerDescription}</p>
        <div className="flex flex-row gap-4">
          <DashboardListingEditOfferButton/>
          <DashboardListingDeleteOfferButton offerId={activeOffering.offerId}/>
        </div>
      </div>
    </div>  
    )
} 
import { useActiveListingStore } from "@/lib/store"
import DashboardListingsDetailsViewHeader from "./dashboard-listing-details-view-header"
import DashboardListingsDetailsViewOfferForm from "./dashboard-listing-details-view-offer-form"
import DashboardListingsDetailsViewOffer from "./dashboard-listing-details-view-offer"
import DashboardListingsDetailsViewOfferEditForm from "./dashboard-listing-details-view-offer-edit-form"

export const DashboardListingsDetailsView = () => {
    const activeOffering = useActiveListingStore(store => store.activeOffering)
    const isEditing = useActiveListingStore(store => store.isEditing)

    return (
    <div className="flex flex-col w-1/3 h-full border-[0.5px] border-[#D4D4D4] rounded-2xl p-6 justify-between">
      {activeOffering.id == "" && 
        <p className="h-full flex justify-center items-center text-sm font-light text-main-black">
          Wybierz ogłoszenie aby zaoferować swoje usługi
        </p>
      }

      {activeOffering.id &&  
      <div className="h-full flex flex-col justify-between">
        <DashboardListingsDetailsViewHeader/>
        {isEditing ? <DashboardListingsDetailsViewOfferEditForm offerDescription={activeOffering.offerDescription}/> 
        : activeOffering.offerDescription ? <DashboardListingsDetailsViewOffer/> : <DashboardListingsDetailsViewOfferForm/>  }
      </div>
      }
    </div>
    )
} 
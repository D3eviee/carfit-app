import { useActiveListingStore } from "@/lib/store"
import DashboardListingsDetailsViewTags from "./dashboard-listing-details-view-tags"

export default function DashboardListingsDetailsViewHeader(){
    const activeOffering = useActiveListingStore(store => store.activeOffering)
    
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-main-black font-semibold leading-7">{activeOffering.title}</h1>
          <p className="text-sm text-main-black font-light">{activeOffering.description}</p>
        </div>
        <DashboardListingsDetailsViewTags/>
      </div>
    )
} 
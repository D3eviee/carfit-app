import { useActiveListingStore } from "@/lib/store";
import { cn } from "@/utils";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInYears } from "date-fns";

type UserAnnouncmentListItemProps = {
  id: string
  createdAt: Date
  status: string
  title: string
  category: string
  description: string
  brand: string
  model: string
  town: string
  district: string
  clientName: string
  clientPhone: string
  offerId: string | null
  offerDescription: string | null 
}

export const DashboardListingsItem = ({ listingData }:{ listingData: UserAnnouncmentListItemProps }) => {
    const markActiveOffering = useActiveListingStore(store => store.markActiveOffering)
    const activeOfferingId = useActiveListingStore(store => store.activeOffering.id)
    const displayTimeAgo = (createdDate: Date): string => {
        const now = new Date()
        const diffSeconds = differenceInSeconds(now, createdDate)
        if (diffSeconds < 60) return diffSeconds === 1 ? "1 sekunda temu" : `${diffSeconds} sekund temu`
    
        const diffMinutes = differenceInMinutes(now, createdDate)
        if (diffMinutes < 60) return diffMinutes === 1 ? "1 minuta temu" : `${diffMinutes} minut temu`
    
        const diffHours = differenceInHours(now, createdDate)
        if (diffHours < 24) return diffHours === 1 ? "1 godzina temu" : `${diffHours} godziny temu`
    
        const diffDays = differenceInDays(now, createdDate)
        if (diffDays < 30) return diffDays === 1 ? "1 dzień temu" : `${diffDays} dni temu`
    
        const diffMonths = differenceInMonths(now, createdDate)
        if (diffMonths < 12)  return diffMonths === 1 ? "1 miesiąc temu" : `${diffMonths} miesiące temu`
      
    
        const diffYears = differenceInYears(now, createdDate)
        if (diffYears === 1) return "1 rok temu"
    
        if (diffYears > 1 && diffYears < 5) return `${diffYears} lata temu`
        return `${diffYears} lat temu`
    }
    
    const tags = [`${listingData.town} - ${listingData.district}`, listingData.category, `${listingData.brand} - ${listingData.model}`]

    return (
        <div 
            onClick={() => markActiveOffering(listingData)}
            className={cn("flex flex-col gap-4 border-[0.5px] border-[#D4D4D4]  rounded-2xl px-6 py-6 hover:cursor-pointer active:border-1", 
            listingData.id == activeOfferingId && "border-1")}
        >
            <div className="flex flex-row gap-4">
                {tags.map((tag) => 
                <div key={tag} className="bg-[#f5f5f5] px-3 py-1 rounded-lg w-fit h-fit">
                    <p className="text-main-black font-medium text-xs">{tag}</p>
                </div>
                )}
            </div>
            
            <div className="flex flex-col gap-1">
                <h1 className="text-main-black font-semibold text-2xl">{listingData.title}</h1>
                <p className="text-[#666] text-middle line-clamp-2">{listingData.description}</p>
            </div>

            <p className="text-xs text-main-black font-light">{displayTimeAgo(listingData.createdAt)}</p>
        </div>
    )
} 
'use client'
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { DashboardListingsItem } from "@/components/dashboard/listings/dashboard-listings-item";
import { DashboardListingsDetailsView } from "@/components/dashboard/listings/dashboard-listing-details-view";
import { useListings } from "@/lib/hooks/dashboard/useListings";
import { useIsBusinessPublic } from "@/lib/hooks/dashboard/useIsBusinessPublic";

export default function Listings() {
  const {data: offerings, status} = useListings()
  const {data: isBusinessPublic, status: isBusinessPublicStatus} = useIsBusinessPublic()
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>
  if(isBusinessPublicStatus == "pending") return <Spinner/>
  if(isBusinessPublicStatus == "error") return <Error/>

  return (
    <div className="h-full flex flex-col gap-10 w-full relative overflow-hidden">
      <DashboardPageHeader 
        title="Ogłoszenia" 
        subtitle="Bądź na bierząco z potrzebami klientów i przyjmuj oferty"
      />

      {isBusinessPublic.isPublic
      ?
        <div className="h-full flex flex-row gap-8 overflow-hidden">
          <div className="w-2/3 flex flex-col gap-4 overflow-scroll scrollbar-none">
            {offerings.map((item) => <DashboardListingsItem key={item.id} listingData={item}/>)}
          </div>

          <DashboardListingsDetailsView/>
        </div>
      :
        <div className="w-full h-full flex flex-row gap-8 overflow-hidden items-center justify-center">
          <p className="text-center text-sm text-main-black font-light">Aby zobaczyć ogłoszenia twój serwis musi być publiczny</p>
        </div>
      }
    </div>
  )
}
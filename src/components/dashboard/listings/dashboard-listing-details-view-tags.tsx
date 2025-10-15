import { useActiveListingStore } from "@/lib/store"
import { User, ArrowDownToDot, Phone, Library, CarFront } from "lucide-react";

export const DashboardListingsDetailsViewTags = () => {
    const activeOffering = useActiveListingStore(store => store.activeOffering)
    const offerDetails = [
        {label: "Klient", icon: User, data: activeOffering.clientName},
        {label: "Telefon", icon: Phone, data: activeOffering.clientPhone},
        {label: "Preferowana lokacja", icon: ArrowDownToDot, data: `${activeOffering.town} - ${activeOffering.district}`},
        {label: "Kategoria", icon: Library, data: activeOffering.category},
        {label: "Samochód", icon: CarFront, data: `${activeOffering.brand} ${activeOffering.model}`},
    ]
    
    return (
      <div className="flex flex-col">
        {offerDetails.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex flex-row justify-between border-b-[#D4D4D4] border-b-[0.5px] last-of-type:border-b-0 px-1 py-2.5">
              <div className="flex flex-row gap-3 align-center">
                <Icon size={20} strokeWidth={1} color="#1E6EF3"/>
                <p className="text-sm text-main-black font-normal">{item.label}</p>
              </div>
              <p className="text-sm text-main-black font-light">{item.data}</p>
            </div>
         )})}  
      </div>
    )
} 
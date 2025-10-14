'use client'
import { useActiveListingStore } from "@/lib/store"

export default function DashboardListingEditOfferButton() {
  const toggleIsEditing = useActiveListingStore(store => store.toggleIsEditing)

  return (
    <div 
        onClick={toggleIsEditing}
        className="w-full text-center text-middle py-1.5 bg-main-black text-[#FFF] rounded-xl hover:cursor-pointer hover:bg-[#333] active:scale-[0.99]"
    >
        Edytuj
    </div>
  )
}


"use client";
import { Plus } from "lucide-react";
import { useModalStore } from "@/lib/store";
import { DasboardServicesAddCategoryModal } from "../../modals/dashboard/service/dashboard-service-add-category-modal";

export function DashboardServicesCategoryMenuAddCategoryButton() {
    const openModal = useModalStore(store => store.openModal)
    const hanldeOpeningModal = () => openModal(<DasboardServicesAddCategoryModal/>)

  return (
    <div 
      className="w-fit text-center text-sm px-1 py-1 rounded-lg bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333] active:scale-[0.95]"
      onClick={hanldeOpeningModal}
    >
      <Plus size={18} color="white" strokeWidth={2}/>
    </div>
  )
}
'use client'
import { ServicesCategory } from "@/lib/types";
import { DasboardServiceAddServiceModal } from "../../modals/dashboard/service/dashboard-service-add-service-modal";
import { useModalStore } from "@/lib/store";
import { AddButton } from "@/components/buttons/add-button";

export const DashboardServicesServiceMenuAddServiceButton = ({categories}:{categories: ServicesCategory[]}) => {
  const openModal = useModalStore(store => store.openModal)
  const hanldeOpeningModal = () => openModal(<DasboardServiceAddServiceModal categories={categories}/>)
  
  return (
    <AddButton type="button" onClick={hanldeOpeningModal}>Dodaj usługę</AddButton>
  )
}

 
'use client'
import { useModalStore } from "@/lib/store"
import { DashboardSettingsGalleryDeleteImageModal } from "../../../modals/dashboard/settings/dashboard-settings-gallery-delete-image-modal"

export const DashboardSettingsGalleryGridItemDeleteButton = ({id}:{id:string}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () => openModal(<DashboardSettingsGalleryDeleteImageModal imageId={id}/>)

  return ( 
    <button 
      className=' bg-main-black text-white py-1.5 rounded-2xl  shadow-black border hover:bg-[#333] hover:cursor-pointer'
      onClick={handleOpeningModal}
    >
      Usuń
    </button>  
  )
}
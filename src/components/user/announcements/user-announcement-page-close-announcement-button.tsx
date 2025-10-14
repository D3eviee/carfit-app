'use client'
import { useModalStore } from "@/lib/store"
import { UserAnnouncmentPageCloseAnnouncementModal }  from "../../modals/user/announcements/user-announcement-page-close-announcement-modal"

export const UserAnnouncmentPageCloseAnnouncementButton = ({announcementId}:{announcementId:string}) => {
  const open = useModalStore(store => store.openModal)
  const openModal = () => open(<UserAnnouncmentPageCloseAnnouncementModal announcementId={announcementId} />)

  return (
    <div 
      onClick={openModal}
      className="bg-[#1E6EF3] text-white font-medium rounded-2xl py-3 h-fit text-center hover:cursor-pointer active:scale-[0.98]"
    >
      Zamknij ogłoszenie
    </div>
  )
}
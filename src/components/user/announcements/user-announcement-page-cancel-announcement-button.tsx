'use client'
import { useModalStore } from "@/lib/store"
import { UserAnnouncmentPageCancelAnnouncementModal } from "../../modals/user/announcements/user-announcement-page-cancel-announcement-modal"

export const UserAnnouncmentPageCancelAnnouncementButton = ({announcementId}:{announcementId:string}) => {
  const open = useModalStore(store => store.openModal)
  const openModal = () => open(<UserAnnouncmentPageCancelAnnouncementModal announcementId={announcementId} />)

  return (
    <div 
      onClick={openModal}
      className="bg-[#FE6265] text-white font-medium rounded-2xl py-3 h-fit text-center hover:cursor-pointer active:scale-[0.98]"
    >
      Usuń ogłoszenie
    </div>
  )
}
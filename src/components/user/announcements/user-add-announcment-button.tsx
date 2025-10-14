"use client"
import { UserAnnouncementAddAnnouncementModal } from "@/components/modals/user/announcements/user-announcement-add-announcement-modal"
import { useModalStore } from "@/lib/store"
import { AddButton } from "../../buttons/add-button"

export const UserAddAnnouncementButton = () => {
  const open = useModalStore(store => store.openModal)
  const openModal = () => open(<UserAnnouncementAddAnnouncementModal/>)

  return (
    <AddButton onClick={openModal}>Dodaj ogłoszenie</AddButton>
  )
}

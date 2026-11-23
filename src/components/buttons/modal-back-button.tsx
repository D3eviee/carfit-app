"use client";
import { useModalStore, useToastStore } from "@/lib/store";
import { BackButton } from "./ButtonBack";

export const ModalBackButton = () => {
  const closeModal = useModalStore(store => store.closeModal)
  const removeToast = useToastStore(store => store.removeToast)
  const toasts = useToastStore(store => store.toasts)

  const handleExitModal = () => {
    closeModal()
    if(toasts.length > 0) removeToast(toasts[0].id)
  }

  return (
    <BackButton onBackFn={handleExitModal}/>
  )
}

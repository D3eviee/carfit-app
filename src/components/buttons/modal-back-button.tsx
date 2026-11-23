"use client";
import { useModalStore, useToastStore } from "@/lib/store";
import { ButtonBack } from "./ButtonBack";

export const ModalButtonBack = () => {
  const closeModal = useModalStore(store => store.closeModal)
  const removeToast = useToastStore(store => store.removeToast)
  const toasts = useToastStore(store => store.toasts)

  const handleExitModal = () => {
    closeModal()
    if(toasts.length > 0) removeToast(toasts[0].id)
  }

  return (
    <ButtonBack onBackFn={handleExitModal}/>
  )
}

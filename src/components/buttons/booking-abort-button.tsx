"use client";
import { useModalStore } from "@/lib/store";
import { BookingAbortModal } from "../modals/user/booking/booking-abort-modal";
import { CloseButton } from "./close-button";

export const BookingAbortButton = () => {
  const openModal = useModalStore(store => store.openModal)
  const handleClose = () => openModal(<BookingAbortModal/>)

  return (
    <CloseButton onCloseFn={handleClose}/>
  )
}
"use client";
import { useModalStore } from "@/lib/store";
import { BookingAbortModal } from "../modals/user/booking/booking-abort-modal";
import { ButtonClose } from "./ButtonClose";

export const ButtonBookingAbort = () => {
  const openModal = useModalStore(store => store.openModal)
  const handleClose = () => openModal(<BookingAbortModal/>)

  return (
    <ButtonClose onCloseFn={handleClose}/>
  )
}
'use client'
import { AppointmentDetails } from "@/lib/types";
import UserAppointmentDetailsModal from "./user-appointment-details-modal";
import { useState } from "react"

export default function UserAppointmentDetailsButton({appointmentDetails}:{appointmentDetails:AppointmentDetails}){
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    document.body.style.overflow = "hidden"
    setOpenModal(true)
  };

  const handleCloseModal = () => {
    document.body.style.overflow = ""
    setOpenModal(false)
  }

  return (
    <>
      <div 
        className='w-full flex justify-center bg-[#13161B] border rounded-md overflow-hidden py-1.5'
        onClick={handleOpenModal}
      >
        <p className='text-[#F2F2F2] text-sm font-base'>Szczegóły</p>
      </div>

      <UserAppointmentDetailsModal 
        isOpen={openModal} 
        close={handleCloseModal}
        appointmentDetails={appointmentDetails}
      />
    </>
  );
}

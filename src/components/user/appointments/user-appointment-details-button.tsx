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
        className="w-full text-center py-2 rounded-lg bg-gradient-to-b from-[#313131] to-[#141414] shadow-md text-white hover:bg-[#333] hover:cursor-pointer"
        onClick={handleOpenModal}
      >
        <p className='text-[#F2F2F7] text-sm font-medium'>Szczegóły</p>
      </div>

      <UserAppointmentDetailsModal 
        isOpen={openModal} 
        close={handleCloseModal}
        appointmentDetails={appointmentDetails}
      />
    </>
  );
}

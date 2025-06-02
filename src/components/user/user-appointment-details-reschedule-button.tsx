'use client'
import { useState } from "react"
import UserAppointmentDeleteModal from "./user-appointment-delete-modal";

export default function UserAppointmenetDetailsRescheduleButton({id, closeMainModalFn}:{id:string, closeMainModalFn: () => void}){
  const [openConfirmModal, setOpenConformModal] = useState(false)

  return (
    <>
      <button 
        className="w-full bg-[#1877f2] text-white py-1 rounded hover:cursor-pointer hover:bg-[#0766E1]"
        onClick={() => setOpenConformModal(true)}
        >Przełóź</button>
      <UserAppointmentDeleteModal 
        closeMainModalFn={closeMainModalFn}
        isOpen={openConfirmModal} 
        close={()=>{setOpenConformModal(false)}} 
        id={id}
      />
    </>
  );
}

'use client'
import { useState } from "react"
import UserAppointmentDeleteModal from "./user-appointment-delete-modal";

export default function UserAppointmenetDetailsDeleteButton({id, closeMainModalFn}:{id:string, closeMainModalFn: () => void}){
  const [openConfirmModal, setOpenConformModal] = useState(false)

  return (
    <>
      <button 
        className="w-full bg-[#CF142B] shadow-inner-glass text-white py-2 rounded-lg hover:cursor-pointer hover:bg-[#BE031A]"
        onClick={() => setOpenConformModal(true)}
        >Odwołaj</button>
      <UserAppointmentDeleteModal 
        closeMainModalFn={closeMainModalFn}
        isOpen={openConfirmModal} 
        close={()=>{setOpenConformModal(false)}} 
        id={id}
      />
    </>
  );
}

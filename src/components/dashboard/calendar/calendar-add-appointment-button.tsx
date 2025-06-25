'use client'
import { useState } from "react";
import CalendarAddApppointmentModal from "./calendar-add-appointment-modal";

export default function CalendarAddApppointmentButton() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <button 
        className="py-1.5 px-3 text-sm font-medium text-[#FFF] bg-[#000] rounded-md shadow-[0px_1px_1px_0px_#00000040] outline-none hover:cursor-pointer hover:bg-[#111]"
        onClick={()=>{setOpenModal(true)}}
      >Nowa wizyta</button>
      {openModal && <CalendarAddApppointmentModal  open={openModal} onClose={() => setOpenModal(false)}/>}
    </>
  )
}
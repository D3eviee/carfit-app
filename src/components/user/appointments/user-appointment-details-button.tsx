'use client'
import { AppointmentDetails } from "@/lib/types";
import { UserAppointmentDetailsModal } from "../../modals/user/appointments/user-appointment-details-modal";
import { useModalStore } from "@/lib/store";

export const UserAppointmentDetailsButton = ({appointmentDetails}:{appointmentDetails:AppointmentDetails}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpenModal = () => openModal(<UserAppointmentDetailsModal appointmentDetails={appointmentDetails}/>)

  return (
    <button
      type="button"
      className="w-full text-center py-2.5 rounded-2xl bg-linear-to-b from-[#313131] to-[#141414] shadow-md text-white hover:bg-[#333] hover:cursor-pointer active:scale-xs hover:bg-linear-to-b hover:from-[#191919] hover:to-[#191919]"
      onClick={handleOpenModal}
    >
      <p className='text-[#F2F2F7] text-sm font-medium'>Szczegóły</p>
    </button>
  );
}

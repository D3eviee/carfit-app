'use client'
import { useModalStore } from "@/lib/store"
import { DashboardAppointmentCancelModal } from "../../dashboard/appointment-cancel/dashboard-appointment-cancel-modal"

export const UserAppointmentDetailsModalCancel= ({appointmentId}:{appointmentId:string}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpenCancelModal = () => openModal(<DashboardAppointmentCancelModal appointmentId={appointmentId}/>)

  return (
    <div className="w-full flex justify-center py-6">
      <div 
        onClick={handleOpenCancelModal}
        className="w-fit h-fit px-3 py-2 rounded-lg bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5] text-sm font-medium leading-none border-[0.5px] hover:cursor-pointer hover:bg-[#FCA5A5] active:scale-95 transition"
      >
        Odwołaj wizytę
      </div>
    </div>  
  )
}
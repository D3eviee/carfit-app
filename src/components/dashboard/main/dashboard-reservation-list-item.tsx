import { format } from "date-fns";
import { displayAppointmentTime } from "@/utils";
import { AppoinmentProps } from "@/lib/types";
import { useModalStore } from "@/lib/store";
import { DashboardAppointmentDetailsModal } from "@/components/modals/dashboard/appointment-details/dashboard-appointment-details-modal";
import { DashboardReservationListItemStatus } from "./dashboard-reservation-list-item-status";

export const DashboardReservationListItem = ({reservation}:{reservation:AppoinmentProps}) => {
  const {duration, status, charge, reservationStart, service} = reservation
  const appointmentTitle = service.length == 1 ? `${service[0].name}` : `${service[0].name} i ${service.length} inne usługi`

  // MANAGING APPOINTMNET DETALIS MODAL
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () => openModal(<DashboardAppointmentDetailsModal appointmentData={reservation}/>)

  return (
    <div 
      onClick={handleOpeningModal}
      className="w-full flex flex-row gap-2 px-2 py-4 border-1 border-[#E6E6E6] rounded-2xl hover:cursor-pointer active:scale-[0.98] hover:border-[#D4D4D4] transition-all duration-75 ease-in"
    >
      {/* APPOINTMNET TIME */}
      <div className="flex flex-col text-right text-main-black text-xl leading-6 px-1">
        <h1 className="font-medium">{format(reservationStart, "k")}</h1>
        <h1 className="font-light">{format(reservationStart, "mm")}</h1>
      </div>

      {/* DEVIDER LINE */}
      <hr className="h-full w-[0.5px] bg-[#D4D4D4]"/>
      
      {/* APPOINTMNET DETAILS */}
      <div className="flex flex-col gap-2 w-full">
        {/* SERVICE TYPE */}
        <p className="text-middle text-main-black py-0.5">{appointmentTitle}</p>    
        
        {/* APPOINTMNET TAGS */}
        <div className="flex flex-row gap-2 items-center">
          {/* DURATION */}
          <p className="text-xs px-2 py-0.5 rounded-lg bg-[#F5F0FF] text-[#6D28D9] border-[0.5px] border-[#E0D4FF]">{displayAppointmentTime(duration)}</p>
          {/* CHARGE */}
          <p className="text-xs px-2 py-0.5 rounded-lg bg-[#FAE8FF] text-[#C026D3] border-[0.5px] border-[#F5D0FE]">{charge} PLN</p>
        </div> 

        {/* APPOINTMNET STATUS */}
        <DashboardReservationListItemStatus status={status}/>   
      </div>
    </div>
  )
}
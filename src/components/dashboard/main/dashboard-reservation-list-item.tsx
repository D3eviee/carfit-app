import { format, getDate } from "date-fns";
import { displayAppointmentTime } from "@/utils";
import { DollarSign, MoreVertical, Watch } from "lucide-react";
import { DashboardReservationListReservations } from "@/lib/types";

export default function DashboardReservationListItem({reservation}:{reservation:DashboardReservationListReservations}){
  const {duration, status, charge, reservationStart, services} = reservation

  return (
    <div className="w-full flex flex-row gap-2 p-2 bg-[#F9FAFC] border-[1px] border-[#E8E9EB] rounded-[4px]">
      {/* EVENT DATE */}
      <div className="flex flex-col text-right text-md leading-5 text-[#111] font-normal">
        <h1>{getDate(reservation.reservationStart)}</h1>
        <h1>{format(reservation.reservationStart, "MMM")}</h1>
      </div>

      {/* DEVIDER LINE */}
      <hr className="h-full w-[0.5px] bg-[#E8E9EB]"/>
      
      {/* CONTENT BOX */}
      <div className="flex flex-col gap-2 w-full">

        {/* EVENT TIME AND MORE BUTTON */}
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm text-[#111] font-light">{`${format(reservationStart, "EEEE")}, ${format(reservationStart, "d")} ${format(reservationStart, "MMMM")} ${format(reservation.reservationStart, "y")} ${format(reservationStart, "k")}:${format(reservationStart, "mm")}`}</p>
          <MoreVertical size={20} color="#333" strokeWidth={1} className="box-content"/>
        </div>
        

        {/* EVENT SERVICES */}
        <div className="flex flex-row flex-wrap gap-2">
          { services.map((item) => <p  key={item.service.name} className="text-xs text-[#111] font-normal bg-[#DFE2E7] px-1.5 py-1 rounded-[4px]">{item.service.name}</p>)}
        </div>

        {/* EVENT DURATION AND CHANGE */}
        <div className="flex flex-row items-center gap-2">
            {/* EVENT DURATION*/}
            <div className="px-1 py-0.5 pr-1.5 flex flex-row items-center bg-[#5D44F8] rounded-md">
              <Watch size={14} strokeWidth={1} color="#FFF"/>
              <p className="text-xs text-[#FFF] font-medium leading-none ">{displayAppointmentTime(duration)}</p>
            </div>
            {/* EVENT CHARGE*/}
            <div className="px-1 py-0.5 pr-1.5 flex flex-row items-center bg-[#098EFF] rounded-md">
              <DollarSign size={14} strokeWidth={1} color="#FFF"/>
              <p className="text-xs text-[#FFF] font-medium leading-none">{charge} PLN</p>
            </div>
        </div> 
        {/* EVENT STATUS */}
        {status == "Odwołana" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#FF5F58]">{status}</p>}
        {status == "Oczekująca" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#FDBC2C]">{status}</p>}
        {status == "Zarezerwowana" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#28C840]">{status}</p>}
      </div>
    </div>
  )
}

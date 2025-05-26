import { format, getDate } from "date-fns";
import { displayAppointmentTime } from "@/utils";
import { HandCoins, Watch } from "lucide-react";
import { DashboardReservationListReservations } from "@/lib/types";

export default function DashboardReservationListItem({reservation}:{reservation:DashboardReservationListReservations}){
  const {duration, status, charge, reservationStart, services} = reservation
  
  return (
    <div className="border-b-[0.5px] border-b-slate-200 flex flex-row gap-8 w-full px-4 py-3">
      <div className="text-black font-light text-xl text-right w-fit flex flex-col">
        <p>{getDate(reservation.reservationStart)}</p>
        <p>{format(reservation.reservationStart, "MMM")}</p>
      </div>
      
      <div className="flex flex-col w-full gap-4">
        <p className="text-sm text-[#333] font-normal">{`${format(reservationStart, "EEEE")}, ${format(reservationStart, "d")} ${format(reservationStart, "MMMM")} ${format(reservation.reservationStart, "y")} ${format(reservationStart, "k")}:${format(reservationStart, "mm")}`}</p>
          <div className="flex flex-row  flex-wrap gap-3">
            { services.map((item) => <p  key={item.service.name} className="text-xs text-[#111] font-medium bg-slate-200 px-2 py-1 rounded">{item.service.name}</p>)}
          </div>


          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row gap-1">
              <Watch size={18} strokeWidth={2}/>
              <p className="text-sm text-[#333] font-normal">{displayAppointmentTime(duration)}</p>
            </div>
            
            <div className="flex flex-row gap-1">
              <HandCoins size={18} strokeWidth={2}/>
              <p className="text-sm text-[#333] font-normal">{charge} PLN</p>
            </div>
            <p className="text-xs text-white font-medium bg-red-500 px-1.5 py-0.5 rounded-md">{status}</p>
          </div> 
        </div>
    </div>
  )
}

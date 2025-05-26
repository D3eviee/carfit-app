import { DashboardReservationListReservations } from "@/lib/types";
import DashboardReservationListItem from "./dashboard-reservation-list-item";

export default function DashboardReservationList({reservations}: {reservations:DashboardReservationListReservations[]}){
  return (
      <div className="border-2 h-full w-full flex flex-col gap-8 p-8 rounded-[10px]">
        <h1 className="font-semibold text-[#111s] text-xl">Dzisiejsze wizyty</h1>
        <div className="flex flex-col h-full overflow-scroll">
          {reservations?.map((item, index) => (<DashboardReservationListItem key={index} reservation={item}/>))}
          {reservations.length == 0 && <p className="text-center text-sm font-light text-[#333] h-full flex  justify-center items-center">Brak wizyt</p>}
        </div>
      </div>
  )
}

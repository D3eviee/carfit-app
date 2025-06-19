import { DashboardReservationListReservations } from "@/lib/types";
import DashboardReservationListItem from "./dashboard-reservation-list-item";

export default function DashboardReservationList({reservations}: {reservations:DashboardReservationListReservations[]}){
  return (
      <div className="w-full p-4 flex flex-col gap-4 border rounded-lg lg:w-2/3 xl:w-[800px]">
        <h1 className="text-[#111] text-md font-normal">Dzisiejsze wizyty</h1>
        <div className="flex flex-col gap-3 max-h-72 overflow-scroll">
          {reservations?.map((item, index) => (<DashboardReservationListItem key={index} reservation={item}/>))}
          {reservations.length == 0 && <p className="text-center text-sm text-[#333] font-light">Brak wizyt</p>}
        </div>
      </div>
  )
}

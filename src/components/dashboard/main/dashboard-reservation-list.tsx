import { AppoinmentProps } from "@/lib/types";
import { DashboardReservationListItem } from "./dashboard-reservation-list-item";
import { DashboardSectionTitle } from "./dashboard-section-title";

export const DashboardReservationList = ({reservations}: {reservations:AppoinmentProps[]}) => {
  return (
    <div className="w-full p-6 flex flex-col gap-6 border-[0.5px] border-[#D4D4D4] shadow-xs rounded-3xl lg:w-2/3 xl:w-[800px]">
      <DashboardSectionTitle title="Dzisiejsze wizyty"/>
      <div className="h-full flex flex-col gap-3 overflow-scroll">
        { reservations.length == 0 
          ? <p className="h-full flex justify-center items-center text-sm text-main-black font-light">Brak wizyt</p> 
          : reservations.map((item, index) => <DashboardReservationListItem key={index} reservation={item}/>
        )}
      </div>
    </div>
  )
}
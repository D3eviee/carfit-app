'use client'
import { DashboardReservationList }  from "@/components/dashboard/main/dashboard-reservation-list";
import { DashboardVisitChart } from "@/components/dashboard/main/dashboard-visit-chart";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { useTodayAppointments } from "@/lib/hooks/dashboard/useTodayAppointments";

export default function Dashboard() {
  const {data: todayReservationsData, status} = useTodayAppointments()
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className="w-full h-full flex flex-col gap-4 lg:flex-row">
      {todayReservationsData && <DashboardReservationList reservations={todayReservationsData}/>}

      <div className="w-full flex flex-col gap-5 h-full">
        <DashboardVisitChart/>
        {/* <DashboardTopServicesChart/> */}
      </div>
    </div>
  );
}
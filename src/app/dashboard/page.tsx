'use client'
import { useQuery } from "@tanstack/react-query";
import { getTodayReservations, getLastWeekTopServicesNumbers, getLastWeekReservationsNumbers } from "./actions";
import DashboardReservationList from "@/components/dashboard/main/dashboard-reservation-list";
import DashboardVisitChart from "@/components/dashboard/main/dashboard-visit-chart";
import DashboardTopServicesChart from "@/components/dashboard/main/dashboard-top-services-chart";

export default function Dashboard() {
  const {data: todayReservationsData, status:todayReservationsDataStatus} = useQuery({
    queryKey: ["getTodayReservations"],
    queryFn: async () => {
      const response = await getTodayReservations()
      if(response.success) return response.data
      return null
    }
  })

  const {data: getLastWeekReservationsNumbersData, status: getLastWeekReservationsNumbersStatus} = useQuery({
    queryKey: ["getLastWeekReservationsNumbers" ],
    queryFn: async () => {
      const response = await getLastWeekReservationsNumbers()
      if(response.success) return response.data
      return null
    }
  })

  const {data: getLastWeekTopServicesNumbersData, status: getLastWeekTopServicesNumbersStatus} = useQuery({
    queryKey: ["getLastWeekTopServicesNumbers"],
    queryFn: async () => {
      const response = await getLastWeekTopServicesNumbers()
      if(response.success) return response.data
      return null
    }
  })

  if(todayReservationsDataStatus == "pending") return <p>PENDING</p>
  if(todayReservationsDataStatus == "error") return <p>ERROR</p>
  if(getLastWeekReservationsNumbersStatus == "pending") return <p>PENDING</p>
  if(getLastWeekReservationsNumbersStatus == "error") return <p>ERROR</p>
  if(getLastWeekTopServicesNumbersStatus == "pending") return <p>PENDING</p>
  if(getLastWeekTopServicesNumbersStatus == "error") return <p>ERROR</p>

  return (
    <div className="w-full flex flex-col gap-4 lg:flex-row border">
      {todayReservationsData && <DashboardReservationList reservations={todayReservationsData}/>}

      <div className="w-full flex flex-col gap-4">
        {getLastWeekReservationsNumbersData && <DashboardVisitChart reservationData={getLastWeekReservationsNumbersData}/>}
        {getLastWeekTopServicesNumbersData &&  <DashboardTopServicesChart topServicesData={getLastWeekTopServicesNumbersData}/>}
      </div>
    </div>
  );
}

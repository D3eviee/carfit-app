'use client'
import { UserAppointmentListItem } from "./user-appointment-list-item";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { useClientAppointments } from "@/lib/hooks/client/useClientAppointments";

export const UserAppointmentList = () => {
  // GETTING ALL OF THE USER APPOINTMENTS
  const {data: appointments, status} = useClientAppointments()
  if(status == "pending") return <Spinner color="#000"/>
  if(status == "error") return <Error/>

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:flex-row">
      {appointments.length == 0 
      ? <p className="flex items-center justify-center text-main-black font-normal">Brak wizyt</p>
      : appointments.map((item, i) => <UserAppointmentListItem key={i} details={item}/> )}
    </div>
  )
}
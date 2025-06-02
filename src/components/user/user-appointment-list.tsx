'use client'
import { useQuery } from "@tanstack/react-query";
import UserAppointmentListItem from "./user-appointment-list-item";
import { getClientAppointments } from "@/app/user/actions";
import { Loader2 } from "lucide-react";

export default function UserAppointmentList(){
  // GETTING ALL OF THE USER APPOINTMENTS
  const {data: clientAppointmentsData, status: clientAppointmentsStatus} = useQuery({
    queryKey: ["getClientAppointments"],
    queryFn: async () => {
      const response = await getClientAppointments()
      if(!response.success) return null
      return response.data
    }
  })

  if(clientAppointmentsStatus == "pending") return <Loader2 className="w-full animate-spin text-gray-500  h-6 text-center"/>
  if(clientAppointmentsStatus == "error")return <p className="w-full text-center text-red-700">Wystąpił błąd podczas ładowania rezerwacji</p>


  return (
    <div className="w-full flex flex-col justify-between gap-5 lg:flex-row md:flex-wrap">
      {clientAppointmentsData?.length == 0 && <p className="flex items-center justify-center text-[#333] font-normal">Brak wizyt</p>}

      {clientAppointmentsData && clientAppointmentsData.map((item, i) => {
        return <UserAppointmentListItem key={i} details={item}/>
      })
      }
    </div>
  )
}
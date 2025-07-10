'use client'
import { useQuery } from "@tanstack/react-query";
import UserAppointmentListItem from "./user-appointment-list-item";
import { getClientAppointments } from "@/app/user/actions";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";

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

  if(clientAppointmentsStatus == "pending") return <Spinner/>
  if(clientAppointmentsStatus == "error") return <Error/>

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:flex-row overflow-hidden">
      {clientAppointmentsData?.length == 0 && <p className="flex items-center justify-center text-[#333] font-normal">Brak wizyt</p>}

      {clientAppointmentsData && clientAppointmentsData.map((item, i) => {
        return <UserAppointmentListItem key={i} details={item}/>
      })
      }
    </div>
  )
}
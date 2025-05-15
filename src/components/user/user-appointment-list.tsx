'use client'
import { useQuery } from "@tanstack/react-query";
import UserAppointmentListItem from "./user-appointment-list-item";
import { getClientAppointments } from "@/app/user/actions";

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

  if(clientAppointmentsStatus == "pending") return <p>PENDING</p>
  if(clientAppointmentsStatus == "error")return <p>ERROR</p>

  return (
    <div className="flex flex-col flex-wrap justify-between gap-5 min-h-56 w-full">
        {clientAppointmentsData?.length == 0 && <p className="flex items-center justify-center text-[#333] font-normal">No appointments</p>}

        {clientAppointmentsData && clientAppointmentsData.map((item, i) => {
          return <UserAppointmentListItem key={i} details={item}/>
        })
        }
    </div>
  )
}
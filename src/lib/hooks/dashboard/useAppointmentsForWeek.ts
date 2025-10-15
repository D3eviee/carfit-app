"use client"
import { getAppointmentsForWeekInterval } from "@/app/dashboard/calendar/actions";
import { useQuery } from "@tanstack/react-query";

export const useAppointmentForWeek = (interval: Date[]) =>{
    return useQuery({
    queryKey:['getAppointmentsForWeekInterval', interval],
    queryFn: async () => {
      const response = await getAppointmentsForWeekInterval(interval);
      if(!response.success) return null 
      return response.data
    }
  })
}
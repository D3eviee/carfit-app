"use client"
import { getActiveMonthAppointments } from "@/app/(landing)/actions";
import { useQuery } from "@tanstack/react-query";

export const useAppointmentForMonth = (activeData: Date, businessId:string) =>{
    return useQuery({
    queryKey:['getBookingActiveMonthAppointments', activeData],
    queryFn: async () => {
      const response = await  getActiveMonthAppointments(activeData, businessId)
      if(!response.success) return null 
      return response.data
    },
    enabled: !!businessId
  })
}
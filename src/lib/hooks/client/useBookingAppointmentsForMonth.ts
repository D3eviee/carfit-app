"use client"
import { useQuery } from "@tanstack/react-query";
import { addMonths, startOfMonth } from "date-fns"
import { getReservationsInRange } from "@/actions/booking/availability"


export const useAppointmentForMonth = (activeDate: Date, businessId: string) => {
  const from = startOfMonth(activeDate)
  const to = addMonths(from, 1)
  
  return useQuery({
    queryKey: ["booking-month-reservations", businessId, from.toISOString()],
    queryFn: async () => {
      const response = await getReservationsInRange(businessId, from.toISOString(), to.toISOString())
      if (!response.success) throw new Error(response.message)
      return response.data
    },
    enabled: !!businessId,
    refetchInterval: 60_000,
  })
}
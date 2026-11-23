"use client"
import { getBusinessWorkingHours } from "@/actions/booking/availability"
import { useQuery } from "@tanstack/react-query";

export const useBookingWokingHours = (businessId: string) => {
    return useQuery({
        queryKey: ["booking-working-hours", businessId],
        queryFn: async () => {
            const response = await getBusinessWorkingHours(businessId)
            if (!response.success) throw new Error(response.message)
            return response.data
        },
        enabled: !!businessId,
        staleTime: 5 * 60 * 1000,
    });
}
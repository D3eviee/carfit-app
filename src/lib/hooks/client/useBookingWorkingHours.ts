import { getBusinessWorkingHours } from "@/app/(landing)/actions";
import { useQuery } from "@tanstack/react-query";

export const useBookingWokingHours = (businessId: string) => {
    return useQuery({
        queryKey: ["getBookingWorkingHours"],
        queryFn: async () => {
            const response = await getBusinessWorkingHours(businessId)
            if (!response.success) return
            return response.data
        },
        enabled: !!businessId
    });
} 
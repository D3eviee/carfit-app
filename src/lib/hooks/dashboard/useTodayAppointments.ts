import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "@/app/dashboard/actions";

export const useTodayAppointments = () => {
  return useQuery({
    queryKey: ["getTodayAppointments"],
    queryFn: async () => {
      const response = await getTodayAppointments();
      console.log(response)
      if (!response.success) return
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5, 
  });
}
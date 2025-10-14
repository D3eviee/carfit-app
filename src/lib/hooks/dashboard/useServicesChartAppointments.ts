import { useQuery } from "@tanstack/react-query";
import { getServicesChartData } from "@/app/dashboard/actions";

export const useServicesChartAppointments = () => {
  return useQuery({
    queryKey: ["getServicesChartData"],
    queryFn: async () => {
      const response = await getServicesChartData();
      if (!response.success) return
      return response.data;
    },
    staleTime: 1000 * 60 * 15,
    refetchInterval: 1000 * 60 * 15, 
  });
}
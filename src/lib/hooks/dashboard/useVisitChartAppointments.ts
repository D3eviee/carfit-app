import { useQuery } from "@tanstack/react-query";
import { getVisitChartData } from "@/app/dashboard/actions";

export const useVisitChartAppointments = () => {
  return useQuery({
    queryKey: ["getVisitChartData"],
    queryFn: async () => {
      const response = await getVisitChartData();
      if (!response.success) return
      return response.data;
    },
    refetchInterval: 1000 * 60 * 15, 
  });
}
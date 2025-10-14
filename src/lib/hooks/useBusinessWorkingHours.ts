import { useQuery } from "@tanstack/react-query";
import { getWorkingTimeDataForNewAppointmet } from "@/actions/actions";

export const useBusienessWorkingHours = () => {
  return useQuery({
    queryKey: ["getWorkingHoursData"],
    queryFn: async () => {
      const response = await getWorkingTimeDataForNewAppointmet();
      if (!response.success) return
      return response.data;
    },
  });
}
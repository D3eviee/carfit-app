import { getAppointmentsForWeekInterval } from "@/app/dashboard/calendar/actions";
import { useQuery } from "@tanstack/react-query";

export const useCalendarWeekIntervalAppointments = (weekInterval: Date[]) => {
  return useQuery({
    queryKey: ["getAppointmentsForWeekInterval", weekInterval],
    queryFn: async () => {
      const response = await getAppointmentsForWeekInterval(weekInterval);
      if (!response.success) return null
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
}
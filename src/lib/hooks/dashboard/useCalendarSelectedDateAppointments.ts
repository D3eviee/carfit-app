import { useQuery } from "@tanstack/react-query";
import { useToastStore } from "@/lib/store";
import { getActiveMonthAppointments } from "@/app/dashboard/calendar/actions";

export const useCalendarSelectedDateAppointments = (date: string) => {
  const showToast = useToastStore(store => store.showToast)

  return useQuery({
    queryKey: ["getAppointmentsForSelectedDate", date],
    queryFn: async () => {
      const response = await getActiveMonthAppointments(new Date(date));
      if (!response.success){
        showToast(response.message, "error")
        return
      }
      return response.data;
    },
  });
}
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsTableData } from "@/app/dashboard/appointments/actions";

export const useTableAppointments = () => {
  return useQuery({
    queryKey: ["getTableAppointments"],
    queryFn: async () => {
      const response = await getAppointmentsTableData();
      if (!response.success) return
      return response.data;
    },
  });
}
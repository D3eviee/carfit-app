import { useQuery } from "@tanstack/react-query";
import { getBusinessWorkingHours } from "@/app/dashboard/settings/actions";

export const useSettingsBusinessWorkingHours = () => {
  return useQuery({
    queryKey: ["getSettingsBusinessWorkingHours"],
    queryFn: async () => {
      const response = await getBusinessWorkingHours();
      if (!response.success) return
      return response.data;
    },
  });
}
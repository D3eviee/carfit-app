import { useQuery } from "@tanstack/react-query";
import { getSettingsBusinessData } from "@/app/dashboard/actions";

export const useSettingsBusinessData = () => {
  return useQuery({
    queryKey: ["getSettingsBusinessData"],
    queryFn: async () => {
      const response = await getSettingsBusinessData();
      if (!response) return
      return response.data;
    },
  });
}
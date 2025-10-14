import { useQuery } from "@tanstack/react-query";
import { getBusinessProfile } from "@/actions/dashboard/actions";

export const useBusinessProfile = () => {
  return useQuery({
    queryKey: ["getBusinessProfile"],
    queryFn: async () => {
      const response = await getBusinessProfile();
      if (!response.success) return
      return response.data;
    },
  });
}
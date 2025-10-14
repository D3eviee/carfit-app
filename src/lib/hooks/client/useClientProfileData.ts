import { useQuery } from "@tanstack/react-query";
import { getClientProfileData } from "@/app/user/profile/actions";

export const useClientProfileData = () => {
  return useQuery({
    queryKey: ["userProfileData"],
    queryFn: async () => {
      const response = await getClientProfileData();
      if (!response.success) return
      return response.data;
    },
  });
}
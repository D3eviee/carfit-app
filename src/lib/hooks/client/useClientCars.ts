import { useQuery } from "@tanstack/react-query";
import { getClientProfileData } from "@/app/user/profile/actions";

export const useClientCars = () => {
  return useQuery({
    queryKey: ["useClientCars"],
    queryFn: async () => {
      const response = await getClientProfileData();
      if (!response.success){
        return []
      } 
      return response.data.cars;
    },
  });
}
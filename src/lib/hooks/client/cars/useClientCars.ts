import { useQuery } from "@tanstack/react-query";
import { getClientCars } from "@/actions/cars/actions";

export const CLIENT_CARS_QUERY_KEY = ["client-cars"] as const

export const useClientCars = (enabled: boolean = true) => {
  return useQuery({
    queryKey: CLIENT_CARS_QUERY_KEY,
    queryFn: async () => {
      const response = await getClientCars()
      if (!response.success) return []
      return response.data
    },
    enabled
  });
}
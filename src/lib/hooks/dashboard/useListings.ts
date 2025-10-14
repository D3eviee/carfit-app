import { useQuery } from "@tanstack/react-query";
import { getAllOffering } from "@/app/dashboard/listings/actions";

export const useListings = () => {
  return useQuery({
    queryKey: ["getOfferings"],
    queryFn: async () => {
      const response = await getAllOffering();
      if (!response.success) return
      return response.data;
    },
  });
}
import { useQuery } from "@tanstack/react-query";
import { getBusinessServices } from "@/app/dashboard/services/actions";

export const useBusienessServices = () => {
  return useQuery({
    queryKey: ["getServicesForBusiness"],
    queryFn: async () => {
      const response = await getBusinessServices();
      if (!response.success) return
      return response.data;
    },
  });
}
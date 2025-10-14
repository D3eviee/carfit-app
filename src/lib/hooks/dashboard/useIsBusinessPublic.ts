import { useQuery } from "@tanstack/react-query";
import { isBusinessPublic } from "@/app/dashboard/listings/actions";

export const useIsBusinessPublic = () => {
  return useQuery({
    queryKey: ["isBusinessPublic"],
    queryFn: async () => {
      const response = await isBusinessPublic();
      if (response?.success == false) return
      return response.data
    },
  });
}
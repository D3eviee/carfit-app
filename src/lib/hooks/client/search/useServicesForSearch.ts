import { useQuery } from "@tanstack/react-query";
import { getServicesForSearch } from "@/app/(landing)/actions";

export const useServicesForSearch = (categoryInput: string) => {
  return useQuery({
    queryKey: ["getServicesForSearch", categoryInput],
    queryFn: async () => {
      const result = await getServicesForSearch(categoryInput)
      if(!result.success) return []
      return result.data
    },
    enabled:  categoryInput.length >= 2
  });
}
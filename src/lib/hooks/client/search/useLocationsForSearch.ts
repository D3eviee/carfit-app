import { useQuery } from "@tanstack/react-query";
import { getLocationsForSearch } from "@/app/(landing)/actions";

export const useLocationsForSearch = (location: string) => {
  return useQuery({
    queryKey: ["getlocationsForSearch", location],
    queryFn: async () => {
      const result = await getLocationsForSearch(location)
      if(!result.success) return []
      return result.data
    },
    enabled: location.length >= 3
  });
}
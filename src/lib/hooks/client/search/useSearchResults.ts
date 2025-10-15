import { useQuery } from "@tanstack/react-query";
import { getSearchedBusinesses, getSearchedBusinessesByLocation, getSearchedBusinessesByType, getSearchedBusinessesByTypeAndCategory } from "@/app/search/actions";

export const useSearchResults = (location: string, type: string) => {
  return useQuery({
    queryKey: ["getSearchResults", location, type],
    queryFn: async () => {
      if (location && type) return (await getSearchedBusinessesByTypeAndCategory(location, type)).data
      else if (location) return (await getSearchedBusinessesByLocation(location)).data
      else if (type) return (await getSearchedBusinessesByType(type)).data
      else return (await getSearchedBusinesses()).data
    }
  });
}
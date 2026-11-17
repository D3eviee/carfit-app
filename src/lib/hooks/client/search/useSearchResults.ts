import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { unwrapResult } from "./unwrapResult";
import { searchBusinesses } from "@/actions/search/actions";

export const useSearchResults = (location: string, category: string) => {
  const normalizedLocation = location.trim()
  const normalizedCategory = category.trim()

  return useQuery({
    queryKey: ["searchResults", normalizedLocation, normalizedCategory],
    queryFn: async () =>
      unwrapResult(
        await searchBusinesses(normalizedLocation, normalizedCategory),
        "Nie udało się pobrać wyników wyszukiwania"
      ),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  })
}
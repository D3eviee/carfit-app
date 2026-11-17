import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLocationSuggestions } from "@/actions/search/suggestions";
import { unwrapResult } from "./unwrapResult";

const MIN_CHARS = 3

export const useLocationsForSearch = (input: string) => {
  const query = input.trim()

  return useQuery({
    queryKey: ["locationSuggestions", query],
    queryFn: async () =>
      unwrapResult(await getLocationSuggestions(query), "Nie udało się pobrać lokalizacji"),
    enabled: query.length >= MIN_CHARS,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60_000,
  })
}
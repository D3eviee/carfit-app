import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getServiceSuggestions } from "@/actions/search/suggestions";
import { unwrapResult } from "./unwrapResult";

const MIN_CHARS = 2

export const useServicesForSearch = (input: string) => {
  const query = input.trim()

  return useQuery({
    queryKey: ["serviceSuggestions", query],
    queryFn: async () =>
      unwrapResult(await getServiceSuggestions(query), "Nie udało się pobrać serwisów"),
    enabled: query.length >= MIN_CHARS,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  })
}
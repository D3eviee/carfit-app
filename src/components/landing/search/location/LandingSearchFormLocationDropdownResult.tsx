"use client"
import { Error as ErrorState } from "@/components/error";
import { Spinner } from "@/components/spinner";
import { useLocationsForSearch } from "@/lib/hooks/client/search/useLocationsForSearch";
import { NoResultBox } from "../NoResultBox";
import { OptionList } from "../OptionList";

type Props = {
  query: string
  onSelect: (value: string) => void
}

export const LandingSearchFormLocationDropdownResult = ({ query, onSelect }: Props) => {
  const { data, isPending, isError } = useLocationsForSearch(query)

  if (isPending) return <Spinner />
  if (isError) return <ErrorState />

  const towns = data.map((item) => item.town)

  if (towns.length === 0) {
    return <NoResultBox description="Brak warsztatów w podanej lokalizacji" />
  }

  return <OptionList options={towns} onSelect={onSelect} />
}
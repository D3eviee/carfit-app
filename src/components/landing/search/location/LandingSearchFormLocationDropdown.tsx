"use client"
import { useDebounce } from "@/app/search/hooks";
import { SEARCH_LOCATIONS } from "@/lib/constants/search";
import { NoResultBox } from "../NoResultBox";
import { OptionList, filterOptions } from "../OptionList";
import { LandingSearchFormLocationDropdownResult } from "./LandingSearchFormLocationDropdownResult";

const MIN_CHARS = 3
const CITY_NAMES = SEARCH_LOCATIONS.map((location) => location.name)

type Props = {
  input: string
  onSelect: (value: string) => void
}

export const LandingSearchFormLocationDropdown = ({ input, onSelect }: Props) => {
  const query = input.trim()
  const debouncedQuery = useDebounce(query, 300)

  if (query.length === 0) {
    return <OptionList title="Miasta" options={CITY_NAMES} onSelect={onSelect} />
  }

  // Too short for a server search – filter popular cities locally
  if (query.length < MIN_CHARS) {
    const matches = filterOptions(CITY_NAMES, query)
    if (matches.length > 0) {
      return <OptionList title="Miasta" options={matches} onSelect={onSelect} />
    }
    return (
      <div className="flex flex-col gap-5">
        <NoResultBox title="Wpisz co najmniej 3 znaki" description="lub wybierz jedno z poniższych miast" />
        <OptionList title="Miasta" options={CITY_NAMES} onSelect={onSelect} />
      </div>
    )
  }

  return <LandingSearchFormLocationDropdownResult query={debouncedQuery} onSelect={onSelect} />
}
"use client"
import { useDebounce } from "@/app/search/hooks";
import { OptionList, filterOptions } from "../OptionList";
import { CATEGORIES, LandingSearchFormCategoryDropdownResult } from "./LandingSearchFormCategoryDropdownResult";

const MIN_CHARS = 2

type Props = {
  input: string
  onSelect: (value: string) => void
}

export const LandingSearchFormCategoryDropdown = ({ input, onSelect }: Props) => {
  const query = input.trim()
  const debouncedQuery = useDebounce(query, 300)

  // Too short for a server search – filter categories locally
  if (query.length < MIN_CHARS) {
    const matches = query ? filterOptions(CATEGORIES, query) : CATEGORIES
    return (
      <OptionList
        title="Kategorie"
        options={matches.length > 0 ? matches : CATEGORIES}
        onSelect={onSelect}
      />
    )
  }

  return <LandingSearchFormCategoryDropdownResult query={debouncedQuery} onSelect={onSelect} />
}
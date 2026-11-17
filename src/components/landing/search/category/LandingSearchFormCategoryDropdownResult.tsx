"use client"
import { Error as ErrorState } from "@/components/error";
import { Spinner } from "@/components/spinner";
import { SERVICES_CATEGORIES } from "@/lib/constants/search";
import { useServicesForSearch } from "@/lib/hooks/client/search/useServicesForSearch";
import { NoResultBox } from "../NoResultBox";
import { OptionList, filterOptions } from "../OptionList";
import { LandingSearchFormCategoryDropdownResultItem } from "./LandingSearchFormCategoryDropdownResultItem";

export const CATEGORIES = SERVICES_CATEGORIES.map((item) => item.name)

type Props = {
  query: string
  onSelect: (value: string) => void
}

export const LandingSearchFormCategoryDropdownResult = ({ query, onSelect }: Props) => {
  const { data, isPending, isError } = useServicesForSearch(query)

  if (isPending) return <Spinner />
  if (isError) return <ErrorState />

  const matchingCategories = filterOptions(CATEGORIES, query)

  if (data.length === 0 && matchingCategories.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <NoResultBox description="Wyczyść wyszukiwanie lub wybierz jedną z poniższych opcji" />
        <OptionList title="Kategorie" options={CATEGORIES} onSelect={onSelect} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {matchingCategories.length > 0 && (
        <OptionList title="Kategorie" options={matchingCategories} onSelect={onSelect} />
      )}

      {data.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="p-1 text-sm font-medium text-[#191919]">Serwisy</p>
          <ul className="flex flex-col gap-1">
            {data.map((service) => (
              <li key={service.id}>
                <LandingSearchFormCategoryDropdownResultItem service={service} onSelect={onSelect} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
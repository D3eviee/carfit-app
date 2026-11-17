"use client"
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Wrench } from "lucide-react";
import { SearchField } from "./SearchField";
import { LandingSearchFormCategoryDropdown } from "./category/LandingSearchFormCategoryDropdown";
import { LandingSearchFormLocationDropdown } from "./location/LandingSearchFormLocationDropdown";

export const LandingSearchForm = () => {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location.trim()) params.set("location", location.trim())
    if (category.trim()) params.set("category", category.trim())
    const qs = params.toString()
    router.push(qs ? `/search?${qs}` : "/search")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-3xl bg-[#F2F2F7] px-4 py-6 inset-shadow-glass md:flex-row md:rounded-2xl md:px-3 md:py-2"
    >
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <SearchField
          icon={<Wrench size={20} strokeWidth={1.5} />}
          placeholder="Kategorie i warsztaty"
          value={category}
          onChange={setCategory}
          renderDropdown={(close) => (
            <LandingSearchFormCategoryDropdown
              input={category}
              onSelect={(value) => { setCategory(value); close() }}
            />
          )}
        />

        <SearchField
          icon={<MapPin size={20} strokeWidth={1.5} />}
          placeholder="Lokalizacja"
          value={location}
          onChange={setLocation}
          renderDropdown={(close) => (
            <LandingSearchFormLocationDropdown
              input={location}
              onSelect={(value) => { setLocation(value); close() }}
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-linear-to-b from-[#313131] to-[#141414] px-6 py-3 text-base font-medium text-white shadow-md hover:cursor-pointer active:scale-xs md:w-fit md:px-9"
      >
        Szukaj
      </button>
    </form>
  )
}
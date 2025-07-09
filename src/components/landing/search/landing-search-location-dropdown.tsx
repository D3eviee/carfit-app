"use client";
import LandingSearchCategoryDropdownNoResult from "./landing-search-dropdown-no-result";
import LandingSearchCategoryDropdownCategories from "./landing-search-dropdown-default";
import LandingSearchCategoryDropdownResult from "./landing-search-dropdown-category-results";
import { useDebounce } from "@/app/search/hooks";
import LandingSearchLocationDropdownCities from "./landing-search-location-dropdown-cities";

type LandingSearchCategoryDropdownProps = {
  isOpen: boolean
  onClose: () => void
  locationInput:string
  setLocation: (category?:string) => void
}

export default function LandingSearchLocationDropdown({isOpen, onClose, setLocation, locationInput}: LandingSearchCategoryDropdownProps) {
  if(!isOpen) return null

  const debouncedInput = useDebounce(locationInput, 300)

  return (
    <div className="absolute max-h-48 overflow-scroll  bg-[#eee] top-full p-0.5 mt-0.5 w-full border rounded-lg  shadow-md">
      {(locationInput.length > 0 && locationInput.length < 2) && 
        <LandingSearchCategoryDropdownNoResult 
          onClose={onClose} 
          setCategory={setLocation}
        />
      }

      {locationInput.length == 0 && <LandingSearchLocationDropdownCities onClose={onClose} setLocation={setLocation} />}

      {locationInput.length > 1 && <LandingSearchCategoryDropdownResult onClose={onClose} setCategory={setLocation} categoryInput={debouncedInput}/>}
    </div>
  )
}
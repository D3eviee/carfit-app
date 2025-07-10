"use client";
import LandingSearchCategoryDropdownNoResult from "./landing-search-location-no-result";
import { useDebounce } from "@/app/search/hooks";
import LandingSearchLocationDefault from "./landing-search-location-default";
import LandingSearchLocationResult from "./landing-search-location-results";

type LandingSearchCategoryDropdownProps = {
  isOpen: boolean
  onClose: () => void
  locationInput:string
  setLocation: (category?:string) => void
}

export default function LandingSearchLocationDropdown({isOpen, onClose, setLocation, locationInput}: LandingSearchCategoryDropdownProps) {
  const debouncedInput = useDebounce(locationInput, 300)
  if(!isOpen) return null

  return (
    <div className="absolute max-h-48 overflow-scroll  bg-[#eee] top-full p-0.5 mt-0.5 w-full border rounded-lg  shadow-md">
      {(locationInput.length > 0 && locationInput.length < 3) && 
        <LandingSearchCategoryDropdownNoResult 
          onClose={onClose} 
          setLocation={setLocation}
        />
      }

      {locationInput.length == 0 && 
        <LandingSearchLocationDefault onClose={onClose} setLocation={setLocation}/> 
      }



      {locationInput.length >=3 && 
        <LandingSearchLocationResult 
          onClose={onClose} 
          setLocation={setLocation} 
          locationInput={locationInput}
        />
      }
    </div>
  )
}
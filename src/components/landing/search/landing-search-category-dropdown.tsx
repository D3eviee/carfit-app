"use client";
import LandingSearchCategoryDropdownNoResult from "./landing-search-dropdown-no-result";
import LandingSearchCategoryDropdownCategories from "./landing-search-dropdown-default";
import LandingSearchCategoryDropdownResult from "./landing-search-dropdown-category-results";
import { useDebounce } from "@/app/search/hooks";

type LandingSearchCategoryDropdownProps = {
  isOpen: boolean
  onClose: () => void
  categoryInput:string
  setCategory: (category?:string) => void
}

export default function LandingSearchCategoryDropdown({isOpen, onClose, setCategory, categoryInput}: LandingSearchCategoryDropdownProps) {
  const debouncedInput = useDebounce(categoryInput, 300)

  if(!isOpen) return null
  return (
    <div className="absolute max-h-48 overflow-scroll  bg-[#eee] top-full p-0.5 mt-0.5 w-full border rounded-lg  shadow-md">
      {(categoryInput.length > 0 && categoryInput.length < 2) && 
        <LandingSearchCategoryDropdownNoResult 
          onClose={onClose} 
          dropdownFor="category"
          defaultOptions={}
        />
      }

      {categoryInput.length == 0 && <LandingSearchCategoryDropdownCategories onClose={onClose} setCategory={setCategory} />}

      {categoryInput.length > 1 && <LandingSearchCategoryDropdownResult onClose={onClose} setCategory={setCategory} categoryInput={debouncedInput}/>}
    </div>
  )
}
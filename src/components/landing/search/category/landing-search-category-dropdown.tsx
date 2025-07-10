"use client";
import { useDebounce } from "@/app/search/hooks";
import LandingSearchCategoryNoResult from "./landing-search-category-no-result";
import LandingSearchCategoryDefault from "./landing-search-category-default";
import LandingSearchDropdownCategoryResult from "./landing-search-dropdown-category-results";

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
    <div className="z-30 absolute max-h-48 overflow-scroll  bg-[#eee] top-full p-0.5 mt-0.5 w-full border rounded-lg  shadow-md">
      {(categoryInput.length > 0 && categoryInput.length < 2) && 
        <LandingSearchCategoryNoResult
          onClose={onClose}
          setInputState={setCategory}
        />
        
      }

      {categoryInput.length == 0 && <LandingSearchCategoryDefault onClose={onClose} setInputState={setCategory}/>}

      {categoryInput.length > 1 &&
       <LandingSearchDropdownCategoryResult
        categoryInput={debouncedInput} 
        onClose={onClose}
        setCategory={setCategory}

      />
       }
    </div>
  )
}
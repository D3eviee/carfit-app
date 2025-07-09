"use client";
import { useDebounce } from "@/app/search/hooks";
import LandingSearchDropdownNoResult from "./landing-search-dropdown-no-result";
import LandingSearchDropdownDefault from "./landing-search-dropdown-default";
import LandingSearchDropdownCategoryResult from "./landing-search-dropdown-category-results";
import LandingSearchDropdownLocationResult from "./landing-search-dropdown-location-results";

type LandingSearchDropdownProps = {
  dropdownFor: string
  isOpen: boolean
  onClose: () => void
  defaultOptions: string[]
  inputState:string
  setInputState: (option?:string) => void
}

export default function LandingSearchDropdown({isOpen, onClose, inputState, setInputState, defaultOptions, dropdownFor}: LandingSearchDropdownProps) {
  if(!isOpen) return null

  const debouncedInput = useDebounce(inputState, 300)

  return (
    <div className="w-full p-2 absolute mt-0.5 z-10 max-h-48 overflow-scroll bg-[#FFF] border-[1px] border-white rounded-2xl shadow-md scrollbar-thin">
      {(inputState.length > 0 && inputState.length <= 2) && 
        <LandingSearchDropdownNoResult 
          dropdownFor={dropdownFor}
          defaultOptions={defaultOptions}
          onClose={onClose} 
          setInputState={setInputState}
        />
      }

      {inputState.length == 0 && <LandingSearchDropdownDefault onClose={onClose} setInputState={setInputState} defaultOptions={defaultOptions} dropdownFor={dropdownFor}/>}


      {(dropdownFor == "category" &&  inputState.length > 1) && 
        <LandingSearchDropdownCategoryResult 
          defaultOptions={defaultOptions}
          onClose={onClose} 
          setCategory={setInputState} 
          categoryInput={debouncedInput}
        />
      }

      {(dropdownFor == "location" &&  inputState.length > 2) && 
        <LandingSearchDropdownLocationResult 
          onClose={onClose} 
          setLocation={setInputState}
          locationInput={debouncedInput}
        />}
    </div>
  )
}
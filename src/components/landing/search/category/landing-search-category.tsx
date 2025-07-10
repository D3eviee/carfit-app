"use client"
import { useState } from "react";
import { Wrench } from "lucide-react";
import LandingSearchCategoryDropdown from "./landing-search-category-dropdown";

type LandingSearchCategoryProps = {
    categoryState: string
    setCategoryState: (category: string) => void
}

export default function LandingSearchCategory({categoryState, setCategoryState}: LandingSearchCategoryProps) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <div className="relative w-full"> 
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Wrench size={20} color={categoryState == "" ? "#8A8A8E" : "#000" } strokeWidth={1.5} />
        </span>

        <input 
            type="text"
            value={categoryState}
            className="w-full pl-11 pr-3 py-3 text-base text-[#000] rounded-xl placeholder-[#8A8A8E] border-[0.5px] border-transparent outline-none focus:border-[#D4D4D4] shadow-sm md:py-3.5 md:rounded:lg"
            placeholder="Kategorie i warsztaty"
            onChange={(e) => {setCategoryState(e.target.value)}}
            onFocus={() => setIsCategoryDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 100)}
        />

        <LandingSearchCategoryDropdown
            isOpen={isCategoryDropdownOpen}
            onClose={() => setIsCategoryDropdownOpen(false)}
            categoryInput={categoryState}
            setCategory={setCategoryState}
        />
    </div>
  )
}
"use client"
import { useState } from "react";
import LandingSearchDropdown from "./landing-search.dropdown";
import { SERVICES_CATEGORIES } from "@/lib/data";
import { MapPin, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingSearchForm() {
  const router = useRouter()

  const categories = SERVICES_CATEGORIES.map(item => item.name)
  const locations = [
    "Warszawa", 
    "Kraków", 
    "Gdańsk",  
    "Wrocław",   
    "Poznań",   
    "Katowice",              
    "Bydgoszcz",      
    "Lublin",         
    "Zielona Góra",   
    "Łódź",                
    "Opole",          
    "Rzeszów",        
    "Białystok",
    "Kielce",         
    "Olsztyn",        
    "Szczecin"        
  ];

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("");

   const handleSubmit = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.append('location', location);
    }

    if (category.trim()) {
      params.append('category', category);
    }

    const queryString = params.toString()
    const url = `/search?${queryString}`;
    router.push(url);
  };

  return (
    <form className="flex flex-col p-4 bg-[#F2F2F7] border-[0.5px] rounded-3xl gap-3 md:flex-row md:rounded-2xl md:px-3 md:py-2">
      {/* SELECT SERVICE OR CATEGORY */}
      <div className="w-full flex flex-col gap-3 sm:flex-row">
        <div className="relative w-full"> 
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Wrench size={20} color={location == "" ? "#8A8A8E" : "#000" } strokeWidth={1.5} />
          </span>

          <input 
            type="text"
            value={category}
            className="w-full pl-11 pr-3 py-3 text-base text-[#000] rounded-xl placeholder-[#8A8A8E] border-[0.5px] border-transparent outline-none focus:border-[#D4D4D4] shadow-sm md:py-3.5 md:rounded:lg"
            placeholder="Kategorie i warsztaty"
            onChange={(e) => {setCategory(e.target.value)}}
            onFocus={() => setIsCategoryDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 100)}
          />

          <LandingSearchDropdown
            key="1"
            dropdownFor="category"
            defaultOptions={categories}
            isOpen={isCategoryDropdownOpen}
            onClose={() => setIsCategoryDropdownOpen(false)}
            inputState={category}
            setInputState={setCategory}
          />
        </div>

        <div className="relative w-full"> 
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin size={20} color={location == "" ? "#8A8A8E" : "#000" } strokeWidth={1.5}/>
          </span>

          <input 
            type="text"
            value={location}
            className="w-full pl-11 pr-3 py-3 text-base text-[#000] rounded-xl placeholder-[#8A8A8E] border-[0.5px] border-transparent outline-none focus:border-[#D4D4D4] shadow-sm md:py-3.5 md:rounded:lg"
            placeholder="Lokalizacja"
            onChange={(e) => {setLocation(e.target.value)}}
            onFocus={() => setIsLocationDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 100)}
          />

          <LandingSearchDropdown
            key="2"
            dropdownFor="location"
            defaultOptions={locations}
            isOpen={isLocationDropdownOpen}
            onClose={() => setIsLocationDropdownOpen(false)}
            inputState={location}
            setInputState={setLocation}
          />
        </div>
      </div>

        <button
          type="button" 
          onClick={handleSubmit}
          className="w-full font-medium text-base px-6 py-3 rounded-xl bg-gradient-to-b from-[#313131] to-[#141414] shadow-md text-white hover:bg-[#333333] md:w-fit md:rounded-xl md:px-9"
        >
          Szukaj
        </button>
    </form>
  )
}
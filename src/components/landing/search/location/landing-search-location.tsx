"use client"
import { useState } from "react";
import { MapPin } from "lucide-react";
import LandingSearchLocationDropdown from "./landing-search-location-dropdown";

type LandingSearchLocationProps = {
    locationState: string
    setLocationState: (category: string) => void
}

export default function LandingSearchLocation({locationState, setLocationState}:LandingSearchLocationProps) {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState<boolean>(false);
    
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
  ]
    
  return (
    <div className="relative w-full"> 
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MapPin size={20} color={locationState == "" ? "#8A8A8E" : "#000" } strokeWidth={1.5}/>
      </span>
    
      <input 
        type="text"
        value={locationState}
        className="w-full pl-11 pr-3 py-3 text-base text-[#000] rounded-xl placeholder-[#8A8A8E] border-[0.5px] border-transparent outline-none focus:border-[#D4D4D4] shadow-sm md:py-3.5 md:rounded:lg"
        placeholder="Lokalizacja"
        onChange={(e) => {setLocationState(e.target.value)}}
        onFocus={() => setIsLocationDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 100)}
      />
    
      <LandingSearchLocationDropdown
        isOpen={isLocationDropdownOpen}
        onClose={() => setIsLocationDropdownOpen(false)}
        locationInput={locationState}
        setLocation={setLocationState}
      />
    </div>
  )
}
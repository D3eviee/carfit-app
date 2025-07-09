"use client";

type LandingSearchCategoryDropdownProps = {
  onClose: () => void
  setLocation: (category:string) => void
}
export default function LandingSearchLocationDropdownCities({onClose, setLocation}: LandingSearchCategoryDropdownProps) {
  const locations = [
    "Warszawa", 
    "Gdańsk", 
    "Kraków", 
    "Poznań",
    "Katowice",
    "Gdynia",
    "Białystok",
    "Toruń",
    "Bydgoszcz",
  ];

  const handleSelection = (location:string) =>{
    setLocation(location) 
    onClose() 
  }

  return (
    <div>
      {locations.map((category, index) => (
        <div 
        key={index} 
        onClick={() => handleSelection(category)}
        className="border text-sm font-base px-5 py-2 border-b rounded-md border-white/10 last:border-none text-black hover:bg-white"
        >
          {category}
        </div>
      ))}
    </div>
  )
}
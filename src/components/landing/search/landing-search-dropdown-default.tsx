"use client";

type LandingSearchDropdownDefaultProps = {
  dropdownFor: string
  onClose: () => void
  setInputState: (option:string) => void
  defaultOptions: string[]
}

export default function LandingSearchDropdownDefault({onClose, setInputState, defaultOptions, dropdownFor}: LandingSearchDropdownDefaultProps) {

  const handleSelection = (option:string) =>{
    setInputState(option) 
    onClose() 
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="p-1 text-sm text-[#0C0C0C] font-medium">{dropdownFor == "category" ? "Kategorie" : "Popularne miasta"}</p>
      {defaultOptions.map((defaultOption, index) => (
        <div 
        key={index} 
        onClick={() => handleSelection(defaultOption)}
        className="text-sm text-[#0C0C0C] font-base px-3 py-3  rounded-xl  hover:bg-[#F9F9F9]"
        >
          {defaultOption}
        </div>
      ))}
    </div>
  )
}
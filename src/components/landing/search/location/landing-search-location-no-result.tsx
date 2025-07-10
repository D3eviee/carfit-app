'use client'
import LandingSearchLocationDefault from "./landing-search-location-default"

type LandingSearchLocationNoResultProps = {
  onClose: () => void
  setLocation: () => void
}

export default function LandingSearchLocationNoResult({onClose, setLocation}: LandingSearchLocationNoResultProps){
  return (
    <div className="flex flex-col gap-5">
      {/* No result text */}
      <div className="w-full flex flex-col gap-1.5 px-4 py-3 justify-center text-center bg-[#F9F9F9] border-[0.5px] rounded-2xl ">
        <h1 className="text-sm text-[#0C0C0C] font-medium tracking-wide leading-none">Brak wyników</h1>
        <p className="text-xs text-[#0C0C0C] font-light tracking-wide">Wyczyść wyszukiwanie lub wybierz jedną z poniższych opcji</p>
      </div>

      {/* display more options for category */}
      <LandingSearchLocationDefault onClose={onClose} setLocation={setLocation}/>
    </div>
  )
}
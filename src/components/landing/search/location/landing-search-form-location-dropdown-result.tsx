"use client"
import { Error } from "@/components/error";
import { Spinner } from "@/components/spinner";
import { useLocationsForSearch } from "@/lib/hooks/client/search/useLocationsForSearch";

type LandingSearchFormLocationDropdownResultProps = {
  onClose: () => void
  locationInput:string
  setLocation: (businessName?:string) => void
}

export const LandingSearchFormLocationDropdownResult = ({onClose, setLocation, locationInput}: LandingSearchFormLocationDropdownResultProps) => {
  const {data, status} = useLocationsForSearch(locationInput)

  const handleLocationSelection = (town:string) => {
    setLocation(town)
    onClose()
  }

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className="flex flex-col gap-5">
      {data.length > 0 && 
        <div className="flex flex-col gap-2">
          {data.map((business, index) => 
            <p 
              key={index} 
              className="text-sm text-[#0C0C0C] font-base px-3 py-3 rounded-xl hover:bg-[#F9F9F9]" 
              onClick={() => handleLocationSelection(business.town)}
            >
              {business.town}
            </p>)
          }
        </div>
      }

      {data.length == 0 && 
        <div className="w-full flex flex-col gap-1.5 px-4 py-3 justify-center text-center bg-[#F9F9F9] border-[0.5px] border-[#D4D4D4] rounded-2xl ">
          <h1 className="text-sm text-[#0C0C0C] font-medium tracking-wide leading-none">Brak wyników</h1>
          <p className="text-xs text-[#0C0C0C] font-light tracking-wide">Brak warsztatów w podanej lokalizacji</p>
        </div>
      }
    </div>
  )
}
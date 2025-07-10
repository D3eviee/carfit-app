import { useQuery } from "@tanstack/react-query";
import { getLocationsForSearch } from "@/app/(landing)/actions";
import { Error } from "@/components/error";
import { Spinner } from "@/components/spinner";

type LandingSearchLocationResultProps = {
  onClose: () => void
  locationInput:string
  setLocation: (businessName?:string) => void
}

export default function LandingSearchLocationResult({onClose, setLocation, locationInput}: LandingSearchLocationResultProps){
  const {data, status} = useQuery({
    queryKey: ["getServicesForSearch", locationInput],
    queryFn: async () =>{
      const result = await getLocationsForSearch(locationInput)
      if(!result.success) {
        return []
      }
      return result.data
    },
    enabled: locationInput.length >= 3
  }) 

  const handleLocationSelection = (town:string) => {
    setLocation(town)
    onClose
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
        <div className="w-full flex flex-col gap-1.5 px-4 py-3 justify-center text-center bg-[#F9F9F9] border-[0.5px] rounded-2xl ">
          <h1 className="text-sm text-[#0C0C0C] font-medium tracking-wide leading-none">Brak wyników</h1>
          <p className="text-xs text-[#0C0C0C] font-light tracking-wide">Brak warsztatów w podanej lokalizacji</p>
        </div>
      }
    </div>
  )
}
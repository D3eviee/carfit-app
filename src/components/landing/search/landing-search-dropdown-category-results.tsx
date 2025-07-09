import { useQuery } from "@tanstack/react-query";
import { getServicesForSearch } from "@/app/(landing)/actions";
import { Error } from "@/components/error";
import { Spinner } from "@/components/spinner";
import LandingSearchCategoryDropdownNoResult from "./landing-search-dropdown-no-result";
import LandingSearchDropdownCategoryResultItem from "./landing-search-dropdown-category-results-item";

type LandingSearchyDropdownCategoryResultProps = {
  defaultOptions: string[]
  onClose: () => void
  categoryInput:string
  setCategory: (businessName?:string) => void
}

export default function LandingSearchDropdownCategoryResult({onClose, setCategory, categoryInput, defaultOptions}: LandingSearchyDropdownCategoryResultProps){
  const {data, status} = useQuery({
    queryKey: ["getServicesForSearch", categoryInput],
    queryFn: async () =>{
      const result = await getServicesForSearch(categoryInput)
      if(!result.success) {
        return []
      }
      return result.data
    },
    enabled: categoryInput.length >= 2
  }) 

  const handleServiceSelection = (serviceName:string) => {
    setCategory(serviceName)
    onClose
  }

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className="flex flex-col p-1 gap-5">
      {data.length > 0 && 
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#111] font-medium">Serwisy</p>
          {data.map((business, index) => <LandingSearchDropdownCategoryResultItem key={index} businessData={business} onClose={handleServiceSelection}/>)}
        </div>
      }

      {data.length == 0 && <LandingSearchCategoryDropdownNoResult defaultOptions={defaultOptions} onClose={onClose} setInputState={setCategory}/>} 
    </div>
  )
}
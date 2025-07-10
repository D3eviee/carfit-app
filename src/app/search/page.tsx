'use client'
import SearchResultGrid from "@/components/search/search-result-grid";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getSearchedBusinesses, getSearchedBusinessesByLocation, getSearchedBusinessesByType, getSearchedBusinessesByTypeAndCategory } from "./actions";
import { Error } from "@/components/error";
import { Spinner } from "@/components/spinner";

export default function SearchPage() {
  const params = useSearchParams()
  const location = params.get("location")
  const type = params.get("category")

  console.log(location)
  console.log(type)

  const {data, status} = useQuery({
    queryKey: ["getSearchedData"],
    queryFn: async () => {
      if(location && type) return (await getSearchedBusinessesByTypeAndCategory(location, type)).data
      else if(location ) return (await getSearchedBusinessesByLocation(location)).data
      else if(location ) return (await getSearchedBusinessesByType(type)).data
      else return (await getSearchedBusinesses()).data
    }
  })

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className='w-full flex flex-col gap-8 px-4 md:px-12 xl:px-40 2xl:px-60'>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold text-black">Wyniki</h1>
        <h2 className="mt-[5px] p-0 text-sm font-light">Dostępne serwisy dla {location} - {type}</h2>
      </div>
      <SearchResultGrid data={data}/>
    </div>
  )
}

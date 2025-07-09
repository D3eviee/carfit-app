'use client'
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'next/navigation'
import BusinessCard from "@/components/landing/business-card";
import { getSearchedBusinesses } from "@/app/search/actions";

export default function SearchClient() {
  const location = useSearchParams().get("location")

  const {data:searchResultData, status: searchResultStatus} = useQuery({
    queryKey: ["searchForBusinesses"],
    queryFn: async () => {
      if (!location) return null
      const result =  await getSearchedBusinesses(location)
      if(!result.success) return null
      return result.data
    },
    enabled: !!location
  })

  if(searchResultStatus == "pending") return <p>LOADING...</p>
  if(searchResultStatus == "error") return <p>ERROR...</p>

  return (
    <div className="flex flex-col px-4 md:px-12 xl:px-40 2xl:px-60">
      <h3 className="font-md text-[#111] text-2xl">{`Warszataty dla: ${location}`}</h3>
      <div className="mt-[30px] flex flex-row gap-8 overflow-scroll">
      {searchResultData ?
        searchResultData.map((service) => (
          <BusinessCard key={service.id} serviceData={service}/>
        ))
        : "No data"
      }
      </div>
  </div>
  );
}

'use client'
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'next/navigation'
import BusinessCard from "@/components/business-card";
import { getCategoryBusinesses } from "@/app/categories/actions";

export default function CategoriesClient() {
  const category = useSearchParams().get("category")

  const {data:categoryResultData, status: categoryResultStatus} = useQuery({
    queryKey: ["searchForCategory"],
    queryFn: async () => {
      if (!location) return null
      const result =  await getCategoryBusinesses(category)
      if(!result.success) return null
      return result.data
    },
    enabled: !!location
  })

  if(categoryResultStatus == "pending") return <p>LOADING...</p>
  if(categoryResultStatus == "error") return <p>ERROR...</p>

  return (
    <div className="mt-20 px-64"> 
      <h3 className="font-md text-[#111] text-2xl">{`Warszataty dla: ${location}`}</h3>
      <div className="mt-[30px] flex flex-row gap-8 overflow-scroll">
      {categoryResultData ?
        categoryResultData.map((service) => (
          <BusinessCard key={service.id} serviceData={service}/>
        ))
        : "No data"
      }
      </div>
  </div>
  );
}

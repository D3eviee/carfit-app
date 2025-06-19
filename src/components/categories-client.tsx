'use client'
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'next/navigation'
import BusinessCard from "@/components/business-card";
import { getCategoryBusinesses } from "@/app/categories/actions";

export default function CategoriesClient() {
  const category = useSearchParams().get("topCategory")

  const {data:categoryResultData, status: categoryResultStatus} = useQuery({
    queryKey: ["searchForCategory"],
    queryFn: async () => {
      if (!category) return null
      const result =  await getCategoryBusinesses(category)
      if(!result.success) return null
      return result.data
    },
  })

  console.log(categoryResultData)

  if(categoryResultStatus == "pending") return <p>LOADING...</p>
  if(categoryResultStatus == "error") return <p>ERROR...</p>

  return (
    <div className="mt-20 w-3/4 mx-auto"> 
      <h3 className="font-md text-[#111] text-2xl">{`Kategoria: ${category[0].toUpperCase() + category.slice(1)}`}</h3>
      <div className="mt-[30px] flex flex-row gap-8 overflow-scroll">
      {categoryResultData && category.length != 0 ?
        categoryResultData.map((service) => (
          <BusinessCard key={service.id} serviceData={service}/>
        ))
        : <p className="w-full text-center py-10">Brak warsztatów w wybranej kategorii</p>
      }
      </div>
  </div>
  );
}

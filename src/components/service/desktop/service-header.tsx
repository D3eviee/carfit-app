import { ServicePageTitleDataProps } from "@/lib/types"
import { ServiceHeaderRating } from "../service-header-rating"
import { Dot } from "lucide-react"
import { ServiceIsOpenTagSimpleTag } from "./service-is-open-simple-tag"

export const ServiceHeader = ({serviceHeaderData}:{serviceHeaderData:ServicePageTitleDataProps} ) => {

  const { name, town, district, street, workingDays, reviews, } = serviceHeaderData 
  const locationFormatted = `${street}, ${district}, ${town}`

  return (
    <div className="flex flex-col space-y-3">
      {/* SERVICE NAME */}
      <h1 className="text-4xl text-[#111] font-bold tracking-tight">{name}</h1>
      
      {/* SERVICE MAIN DETAILS */}
      <div className="flex flex-row space-x-1 items-center">
        {/*IS SERVICE OPEN TAG*/}
        <ServiceIsOpenTagSimpleTag workingHoursData={workingDays}/>

        <Dot color="#333" size={16}/>
        {/* RATING */}
        <ServiceHeaderRating reviewsData={reviews}/>

         <Dot color="#333" size={16}/>
        {/* LOCATION */}
        <p className="text-[#8A8A8E] font-normal text-base leading-5 line-clamp-1">{locationFormatted}</p>
      </div>
    </div>
  )
}
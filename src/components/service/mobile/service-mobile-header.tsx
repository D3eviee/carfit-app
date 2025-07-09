import { ServicePageTitleDataProps } from "@/lib/types"
import { ServiceHeaderRating } from "../service-header-rating"
import { ServiceIsOpenTag } from "../service-is-open-tag"

export const ServiceMobileHeader = ({serviceHeaderData}:{serviceHeaderData:ServicePageTitleDataProps} ) => {

  const { name, town, district, street, workingDays, reviews, } = serviceHeaderData 
  const locationFormatted = `${street}, ${district}, ${town}`

  return (
    <div className="flex flex-col px-4 space-y-5">
      {/* SERVICE NAME */}
      <h1 className="text-2xl/7 text-[#111] font-bold tracking-tight">{name}</h1>
      
      {/* SERVICE MAIN DETAILS */}
      <div className="flex flex-col space-y-4">
        {/* RATING */}
        <ServiceHeaderRating reviewsData={reviews}/>

        {/* LOCATION */}
        <p className="w-fit text-[#8A8A8E] font-normal text-base leading-5">{locationFormatted}</p>

        {/*IS SERVICE OPEN TAG*/}
        <ServiceIsOpenTag workingHoursData={workingDays}/>
      </div>
    </div>
  )
}
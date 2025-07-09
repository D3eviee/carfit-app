import { createLinkFormat } from "@/lib/functions"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { BusinessCardProps } from "@/lib/types"

export default function BusinessCard({serviceData}:{serviceData: BusinessCardProps}){
  const {id, name, image, category, town, district, reviews} = serviceData

  const numberOfReviews = reviews.length
  const averageRating = numberOfReviews ? (reviews.reduce((sum, r) => sum + r.rate, 0) / numberOfReviews).toFixed(1) : 0;

  return (
    <Link href={createLinkFormat(id, name)} key={id} >
      <div className="h-[250px] w-[220px] flex flex-col border bg-[#FFF] border-[#E5E5EA] rounded-xl overflow-clip hover:border-[#D4D4D9] group transition-all duration-200 ease-in-out xl:w-[280px] xl:h-[295px]">
        {/* IMAGE BOX */}
        <div className="relative h-1/2 w-full overflow-hidden xl:h-[57%]">
          <Image src={image} alt="service image" fill className="object-cover group-hover:scale-105 transition-all duration-200 ease-in-out"/>
        </div>

        {/* CONTENT */}
        <div className="relative h-1/2 flex flex-col rounded-b-xl gap-2 px-2.5 py-4 xl:h-[43%]">
          <h3 className="text-[15px] text-[#000] font-medium line-clamp-1 leading-none tracking-tight">{name}</h3>
          {/* SMALL DETAILS*/}
          <div className="flex flex-col gap-1">
            {/* LOCATION */}
            <p className="text-[13px] text-[#8A8A8C] font-normal tracking-tight line-clamp-1 lg:font-medium">{district} | {town}</p>
            {/* RAITING BOX */}
            <div className="flex flex-row gap-0.5 items-center">
              {numberOfReviews == 0 ? <p className="text-[13px] font-base text-[#111] ">No reviews</p> 
              :
                <>
                <p className="text-[13px] font-medium text-[#111] ">{averageRating}</p>
                <Star fill="gold" size={15} stroke="none"/>
                <p className="text-[13px] font-light text-[#111] ml-1">{`(${numberOfReviews})`}</p>
                </>
              }
            </div>
          </div>
          
          {/* SERVICE CATEGORY */}   
          <p className="absolute left-2 bottom-2 bg-[#F2F2F2] rounded-lg text-xs font-medium text-[#0A0A0A] py-1 px-2 lg:bottom-2.5">{category}</p>
        </div> 
      </div>
    </Link>
  )
} 
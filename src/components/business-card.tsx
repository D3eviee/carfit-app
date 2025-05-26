import { createLinkFormat } from "@/lib/functions"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { BusinessCardProps } from "@/lib/types"

export default function BusinessCard({serviceData}:{serviceData:BusinessCardProps}){
  const {id, name, image, category, town, district, reviews} = serviceData

  const numberOfReviews = reviews.length
  const averageRating = numberOfReviews ? (reviews.reduce((sum, r) => sum + r.rate, 0) / numberOfReviews).toFixed(1) : 0;

  return (
    <Link href={createLinkFormat(id, name)} key={id}>
      <div className="flex flex-col h-[280px] w-[200px] border-[0.5px] border-[#D4D4D4] rounded-xl overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]
      md:w-[324px] md:h-[340px]">
        {/* IMAGE BOX */}
        <div className="relative h-1/2 w-full md:h-4/6">
          <Image src={image} alt="service image" fill className="object-cover"/>
        </div>
        {/* CONTENT BOX */}
        <div className="h-1/2 border relative flex flex-col gap-1 px-2 py-2 bg-white md:py-1.5 md:px-3 md:gap-0.5">
          <h3 className="text-[#111] text-sm font-semibold md:text-base">{name}</h3>
          <p className="font-normal text-[#333] tracking-tight text-sm">{district} | {town}</p>
          {/* RAITING BOX */}
          <div className="flex flex-row gap-1 items-center">
            {numberOfReviews == 0 ? 
              <p className="font-normal text-[#333333] text-sm">No reviews</p> 
            :
              <>
              <p className="font-normal text-[#333333] text-sm">{averageRating}</p>
              <Star fill="gold" stroke="none" className="size-5 -ml-0.5"/>
              </>
            }
            <p className="font-normal text-[#333333] text-sm">{`(${numberOfReviews})`}</p>
          </div>
          {/* SERVICE CATEGORY */}   
          <p className="absolute bottom-2 rounded-md font-semibold tracking-wider text-[10px] bg-[#111] text-white border-[#777777] py-[5px] px-[7px] shadow-[0px_1px_4px_1px_#ACACAC40] md:bottom-2.5">{category}</p>
        </div>  
      </div>
    </Link>
  )
} 
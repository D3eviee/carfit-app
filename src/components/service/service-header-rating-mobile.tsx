import { Client } from "@/lib/types"
import { Star } from "lucide-react"

type ServiceHeaderRatingData = {
  id: string
  rate: number
  content: string
  client: Client
}

export const ServiceHeaderRatingMobile = ({reviewsData, className}:{reviewsData: ServiceHeaderRatingData[], className:string}) => {
    const numberOfReviews = reviewsData.length
    const averageRating = Number(reviewsData.reduce((sum, item) => sum + item.rate , 0) / numberOfReviews)

    return (
      <div className={`text-xs bg-[#F2F2F2] rounded-sm px-1 py-1 flex flex-row gap-1.5 items-center ${className}`}>
        <p className=" font-bold text-[111111]">{averageRating != 0.0 ? `${averageRating}.0` : "No reviews"}</p>
          {averageRating != 0.0 && <Star color="#FFD700" width={13} fill="#FFD700"/>}
        {/* NUMBERS OF REVIEWS */}
        {numberOfReviews != 0 && <p className="-ml-0.5 flex font-normal text-[111111] tracking-tighter text-nowrap">{`( ${numberOfReviews} )`}</p> }
      </div>
    )
}
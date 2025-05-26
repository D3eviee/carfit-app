import { Client } from "@/lib/types"

type ServiceHeaderRatingData = {
  id: string
  rate: number
  content: string
  client: Client
}

export const ServiceHeaderRating = ({reviewsData, className}:{reviewsData: ServiceHeaderRatingData[], className:string}) => {
    const numberOfReviews = reviewsData.length
    const averageRating = Number(reviewsData.reduce((sum, item) => sum + item.rate , 0) / numberOfReviews)

    return (
      <div className={`bg-[#F2F2F2] rounded-sm px-1 py-1 flex flex-row gap-2 items-center ${className}`}>
        <p className="text-[15px] font-bold text-[111111]">{averageRating != 0.0 ? `${averageRating}.0` : "No reviews"}</p>
          {averageRating != 0.0 && (
            <div className="flex flex-row gap-[3px]">
              {Array.from({ length: Math.floor(averageRating) }, (_, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              ))}
              {Array.from({ length: 5 - Math.floor(averageRating) }, (_, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4F4F4" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              ))}
            </div>
          )}
        {/* NUMBERS OF REVIEWS */}
        {numberOfReviews != 0 && <p className="text-[15px] font-normal text-[111111] tracking-tighter">{`( ${numberOfReviews} )`}</p> }
      </div>
    )
}
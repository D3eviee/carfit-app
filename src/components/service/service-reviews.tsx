import { Review } from "@/lib/types";
import { ServiceReviewItem } from "./service-reviews-item";

export const ServiceReviews = ({reviewsData}:{reviewsData: Review[]}) =>  {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-[30px] text-[#000000] font-medium">Oceny</h1>
      <div className="flex flex-col gap-[15px]">
        {reviewsData.length > 0 ?
          reviewsData?.map((review, index) => (
            <ServiceReviewItem key={index} review={review} />
          ))
          : <p className="text-black">No reviews</p>
        }
      </div>
    </div>
  )
}
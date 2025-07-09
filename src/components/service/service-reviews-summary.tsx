import { Review } from "@/lib/types";
import { ServiceSummaryBars } from "./service-reviews-summary-bars";

export const ServiceReviewsSummary = ({reviewsData}: {reviewsData: Review[]}) =>  {
  const numberOfReviews = reviewsData.length
  const averageRating =  (reviewsData.reduce((sum, r) => sum + r.rate, 0) / numberOfReviews).toFixed(1)

  const displayReviews =  (numberOfReviews: number) => {
    if(numberOfReviews == 1) return `${numberOfReviews} ocena`
    else if (numberOfReviews > 1 && numberOfReviews < 5) return `${numberOfReviews} oceny`
    else return `${numberOfReviews} ocen`
  } 

  return (
    <div className="w-full flex flex-row gap-7 justify-between items-center px-2 ">
      <div className="flex flex-col">
        <h2 className="text-6xl font-bold text-[#191919]">{averageRating}</h2>
        <p className="text-center text-sm text-[#8A8A8A]">{displayReviews(numberOfReviews)}</p>
      </div>
      <div className="flex flex-col w-full space-y-1 md:w-2/3">
        <ServiceSummaryBars data={reviewsData}/>
      </div>
    </div>
  )
}
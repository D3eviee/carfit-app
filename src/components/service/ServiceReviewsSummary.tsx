import { Review } from "@/lib/types"
import { pluralPl } from "@/utils"
import { ServiceSummaryBars } from "./service-reviews-summary-bars"

export const ServiceReviewsSummary = ({ reviewsData }: { reviewsData: Review[] }) => {
  const numberOfReviews = reviewsData.length
  const averageRating = numberOfReviews
    ? (reviewsData.reduce((sum, r) => sum + r.rate, 0) / numberOfReviews).toFixed(1)
    : "0.0"

  return (
    <div className="h-fit w-full flex flex-row gap-7 justify-between items-center px-2">
      <div className="flex flex-col">
        <h2 className="text-6xl font-bold text-[#191919]">{averageRating}</h2>
        <p className="text-center text-sm text-[#8A8A8A]">
          {numberOfReviews} {pluralPl(numberOfReviews, "ocena", "oceny", "ocen")}
        </p>
      </div>
      <div className="flex flex-col w-full space-y-1 md:w-2/3">
        <ServiceSummaryBars data={reviewsData} />
      </div>
    </div>
  )
}
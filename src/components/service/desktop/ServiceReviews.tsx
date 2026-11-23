"use client"
import { Review } from "@/lib/types"
import { useModalStore } from "@/lib/store"
import { ServiceReviewsModal } from "@/components/modals/user/service/service-reviews-modal"
import { ServiceReviewItem } from "../service-reviews-item"
import { ServiceReviewsSummary } from "../ServiceReviewsSummary"

export const ServiceReviews = ({ reviewsData }: { reviewsData: Review[] }) => {
  const previewReviews = reviewsData.slice(0, 6)
  const openModal = useModalStore((store) => store.openModal)
  const handleOpeningModal = () => openModal(<ServiceReviewsModal reviewsData={reviewsData} />)

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl text-[rgb(17,17,17)] font-semibold">Oceny</h1>
        <button
          type="button"
          onClick={handleOpeningModal}
          className="text-[#8A8A8E] text-[15px] font-normal hover:cursor-pointer hover:text-[#797979]"
        >
          Zobacz wszystkie
        </button>
      </div>
      <div className="w-full h-full flex flex-col space-y-5">
        <ServiceReviewsSummary reviewsData={reviewsData} />
        <div className="w-full grid grid-cols-2 gap-5">
          {previewReviews.map((review) => (
            <ServiceReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
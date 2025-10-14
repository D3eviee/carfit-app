'use client'
import { Review } from "@/lib/types";
import { ServiceReviewsSummary } from "../service-reviews-summary";
import { ServiceMobileReviewItem } from "./service-mobile-reviews-item";
import { useModalStore } from "@/lib/store";
import { ServiceReviewsModal } from "@/components/modals/user/service/service-reviews-modal";

export const ServiceMobileReviews = ({reviewsData}:{reviewsData: Review[]}) =>  {
  const previewReviews = reviewsData.slice(5)
  const openModal = useModalStore((store) => store.openModal)
  const handleOpeningModal = () => openModal(<ServiceReviewsModal reviewsData={reviewsData}/>)

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="px-4 flex flex-row justify-between items-center">
          <h1 className="text-2xl text-[rgb(17,17,17)] font-semibold">Oceny</h1>
          <p 
            onClick={handleOpeningModal}
            className="text-[#8A8A8E] text-[15px] font-normal hover:cursor-pointer hover:text-[#797979]"
          >
            Zobacz wszystkie
          </p>
        </div>
        <div className="h-full px-3 flex flex-col space-y-5">
          <ServiceReviewsSummary reviewsData={reviewsData}/>
          <div className="w-full overflow-x-scroll flex flex-row gap-4  snap-x snap-mandatory  scrollbar-none">
            {previewReviews?.map((review, index) => (
                <ServiceMobileReviewItem key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
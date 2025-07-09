'use client'
import { Review } from "@/lib/types";
import { ServiceReviewItem } from "../service-reviews-item";
import { ServiceReviewsAllReviewsModal } from "../desktop/service-reviews-all-reviews-modal";
import { useState } from "react";
import { ServiceReviewsSummary } from "../service-reviews-summary";
import { ServiceMobileReviewItem } from "./service-mobile-reviews-item";
import { ServiceMobileReviewsAllReviewsModal } from "./service-mobile-reviews-all-reviews-modal";

export const ServiceMobileReviews = ({reviewsData}:{reviewsData: Review[]}) =>  {
  const [isOpenReviewsModal, setIsOpenReviewsModal] = useState<boolean>(false)
  const [scrollYOffset, setScrollYOffset] = useState<number>()
  const previewReviews = reviewsData.slice(5)

  const handleOpeningModal = () => {
    document.body.style.overflow = "hidden"
    setScrollYOffset(window.scrollY)
    setIsOpenReviewsModal(true)
  }

  return (
    <>
      <div className="w-full h-full flex flex-col gap-3">
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

      {/* MODAL SHOWING ALL REVIEWS */}
      <ServiceMobileReviewsAllReviewsModal 
        isOpen={isOpenReviewsModal} 
        onClose={() => setIsOpenReviewsModal(false)} 
        reviewsData={reviewsData} 
        topPosition={scrollYOffset}
      />
    </>
  )
}
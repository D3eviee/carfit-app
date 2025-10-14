'use client'
import { Review } from "@/lib/types";
import { ServiceReviewItem } from "../service-reviews-item";
import { ServiceReviewsSummary } from "../service-reviews-summary";
import { useModalStore } from "@/lib/store";
import { ServiceReviewsModal } from "@/components/modals/user/service/service-reviews-modal";

export const ServiceReviews = ({reviewsData}:{reviewsData: Review[]}) =>  {
  const previewReviews = reviewsData.slice(0, 6)
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () => openModal(<ServiceReviewsModal reviewsData={reviewsData}/>);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className=" flex flex-row justify-between items-center">
        <h1 className="text-2xl text-[rgb(17,17,17)] font-semibold">Oceny</h1>
        <p 
          onClick={handleOpeningModal}
          className="text-[#8A8A8E] text-[15px] font-normal hover:cursor-pointer hover:text-[#797979]"
        >
          Zobacz wszystkie
        </p>
      </div>
      <div className="w-full h-full  flex flex-col space-y-5">
        <ServiceReviewsSummary reviewsData={reviewsData}/>
        <div className="w-full grid grid-cols-2 flex-wrap gap-5">
          {previewReviews.map((review, index) => <ServiceReviewItem key={index} review={review}/>)}
        </div>
      </div>
    </div>
  )
}
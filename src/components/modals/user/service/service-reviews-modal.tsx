import { Review } from "@/lib/types";
import { ServiceReviewItem } from "../../../service/service-reviews-item";
import { ServiceReviewsSummary } from "../../../service/service-reviews-summary";
import { ModalBackButton } from "../../../buttons/modal-back-button";

type ServiceReviewsModalProps = {
  reviewsData: Review[]
}

export const ServiceReviewsModal = ({reviewsData}: ServiceReviewsModalProps) =>  {
  return (  
    <div className="h-full w-full overflow-scroll bg-white md:rounded-4xl md:w-[85%] md:h-[75%] lg:w-[80%] xl:w-[65%] 2xl:w-[57%]">
      <div className="flex flex-col gap-5 h-full">
        <div className="w-full z-10 fixed p-6 md:absolute md:bg-[#FFF] md:shadow-small md:w-[85%] lg:w-[80%] xl:w-[65%] 2xl:w-[57%] md:rounded-t-4xl">
          <ModalBackButton />
        </div>
        <div className="px-6 mt-26 flex flex-col gap-5 py-5">
          {/* TITLE */}
          <h1 className="text-main-black text-2xl font-bold leading-none">Oceny i recenzje</h1>

          {/* REVIEW SUMMARY */}
          <ServiceReviewsSummary reviewsData={reviewsData}/>

          {/* REVIEWS */}
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-3.5 overflow-hidden">
            {reviewsData.map((review, index) => <ServiceReviewItem key={index} review={review} /> )}
          </div>
        </div>
      </div>
    </div>
  )
}
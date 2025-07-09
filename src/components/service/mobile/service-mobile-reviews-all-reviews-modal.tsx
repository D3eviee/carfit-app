import { Review } from "@/lib/types";
import { ServiceReviewItem } from "../service-reviews-item";
import { ServiceReviewsSummary } from "../service-reviews-summary";
import { ServiceMobileModalProvider } from "./service-mobile-modal-provider";

type ServiceMobileReviewsAllReviewsModalProps = {
  isOpen:boolean
  onClose: () => void
  reviewsData: Review[]
  topPosition: number
}

export const ServiceMobileReviewsAllReviewsModal = ({isOpen, onClose, reviewsData, topPosition}: ServiceMobileReviewsAllReviewsModalProps) =>  {
  return (  
    <ServiceMobileModalProvider
      isOpen={isOpen}
      onClose={onClose}
      title="Oceny i opinie"
      topPosition={topPosition}
    >
      <div className="h-full space-y-5">
        {/* REVIEW SUMMARY */}
        <ServiceReviewsSummary reviewsData={reviewsData}/>

        {/* REVIEWS */}
        <div className="flex flex-col gap-3.5 pb-5">
          {reviewsData.map((review, index) => <ServiceReviewItem key={index} review={review} /> )}
        </div>
      </div>
    </ServiceMobileModalProvider>
  )
}
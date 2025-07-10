import { Review } from "@/lib/types";
import { ServiceReviewItem } from "../service-reviews-item";
import { ServiceReviewsSummary } from "../service-reviews-summary";
import { ServiceModalProvider } from "./service-modal-provider";

type ServiceReviewsAllReviewsModalProps = {
  isOpen:boolean
  onClose: () => void
  reviewsData: Review[]
  topPosition: number
}

export const ServiceReviewsAllReviewsModal = ({isOpen, onClose, reviewsData}: ServiceReviewsAllReviewsModalProps) =>  {
  return (  
    <ServiceModalProvider
      isOpen={isOpen}
      onClose={onClose}
      title="Oceny i opinie"
    >
      <div className="h-full space-y-5">
        {/* REVIEW SUMMARY */}
        <ServiceReviewsSummary reviewsData={reviewsData}/>

        {/* REVIEWS */}
        <div className="grid grid-cols-2 gap-5 pb-5">
          {reviewsData.map((review, index) => <ServiceReviewItem key={index} review={review} /> )}
        </div>
      </div>
    </ServiceModalProvider>
  )
}
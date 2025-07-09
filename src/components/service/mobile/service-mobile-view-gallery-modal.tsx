import Image from "next/image";
import { ServiceMobileModalProvider } from "./service-mobile-modal-provider";

type ServiceReviewsAllReviewsModalProps = {
  isOpen:boolean
  onClose: () => void
  images:{
    id: string;
    businessId: string;
    photoUrl: string;
    priority: number; 
  }[]
  topPosition: number
}
export const ServiceMobileViewGalleryModal = ({isOpen, onClose, images, topPosition}: ServiceReviewsAllReviewsModalProps) =>  {
  return (
    <ServiceMobileModalProvider
      isOpen={isOpen}
      onClose={onClose}
      title="Galeria"
      topPosition={topPosition}
    >
      <div className="flex flex-col gap-3.5 pb-5">
          {images.map((image) => (
            <div
            key={image.id}
            className="rounded-xl overflow-clip relative w-full aspect-[16/10] shadow-xl"
            >
              <Image
                src={image.photoUrl}
                alt="business image"
                fill
                className="object-fill"
              />
            </div>
          ))}
          </div>
    </ServiceMobileModalProvider>
  )
}
import Image from "next/image";
import { ServiceModalProvider } from "./service-modal-provider";

type ServiceReviewsAllReviewsModalProps = {
  isOpen:boolean
  onClose: () => void
  images:{
    id: string;
    businessId: string;
    photoUrl: string;
    priority: number; 
  }[]
}
export const ServiceGalleryModal = ({isOpen, onClose, images}: ServiceReviewsAllReviewsModalProps) =>  {

  
  return (
    <ServiceModalProvider
      isOpen={isOpen}
      onClose={onClose}
      title="Galeria"
    >
      <div className="grid grid-cols-2 gap-3.5 pb-5">
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
    </ServiceModalProvider>
  )
}
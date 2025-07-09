'use client'
import Image from "next/image"
import { useState } from "react";
import { ServiceMobileViewGalleryModal } from "../mobile/service-mobile-view-gallery-modal";
import { ServiceGalleryModal } from "./service-gallery-modal";

type ServiceGalleryProps = {
  images:{
    id: string;
    businessId: string;
    photoUrl: string;
    priority: number; 
  }[]
}

export const ServiceGallery = ({images}:ServiceGalleryProps) => {
  const overviewImages = images.slice(0, 3)
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false)

  const handleOpeningModal = () => {
    document.body.style.overflow = "hidden"
    setIsGalleryOpen(true) 
  }

  return (
    <>
      <div className="flex flex-row gap-3 w-full max-h-[540px] lg:gap-4 xl:gap-6">
        {/* MAIN IMAGE */}
        <div className="relative w-2/3 aspect-[16/10] overflow-hidden rounded-xl shadow-lg">
          <Image
            src={overviewImages[0].photoUrl}
            alt="service image"
            fill
            className="object-cover"
          />
        </div>

        {/* SMALLER IMAGES */}
        <div className="flex flex-col w-1/3 gap-3 lg:gap-4 xl:gap-6">
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl shadow-md">
            <Image
              src={overviewImages[1].photoUrl}
              alt="service image"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl shadow-md">
            <Image
              src={overviewImages[2].photoUrl}
              alt="service image"
              fill
              className="object-cover"
            />
            <div 
              onClick={handleOpeningModal}
              className="absolute bottom-2 right-2 py-1 px-5 bg-[#FFF]/90 border shadow-inner-glass font-medium rounded-xl hover:cursor-pointer">
              Galeria
            </div>
          </div>
        </div>
      </div>

      <ServiceGalleryModal
        images={images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  )
}
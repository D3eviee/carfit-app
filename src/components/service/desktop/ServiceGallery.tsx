"use client"
import Image from "next/image"
import { ServiceGalleryModal } from "@/components/modals/user/service/service-gallery-modal"
import { useModalStore } from "@/lib/store"

type ServiceGalleryProps = {
  images: {
    id: string
    businessId: string
    photoUrl: string
    priority: number
  }[]
}

const GalleryImage = ({ src, sizes, priority }: { src?: string; sizes: string; priority?: boolean }) =>
  src ? (
    <Image src={src} alt="Zdjęcie serwisu" fill sizes={sizes} priority={priority} className="object-cover" />
  ) : (
    <div className="absolute inset-0 bg-[#F2F2F7]" />
  )

export const ServiceGallery = ({ images }: ServiceGalleryProps) => {
  const openModal = useModalStore((store) => store.openModal)
  const handleOpeningModal = () => openModal(<ServiceGalleryModal images={images} />)

  if (images.length === 0) return null
  const [main, second, third] = images

  return (
    <div className="flex flex-row gap-3 w-full max-h-[540px] lg:gap-4 xl:gap-6">
      {/* MAIN IMAGE */}
      <div className="relative w-2/3 aspect-16/10 overflow-hidden rounded-xl shadow-lg">
        <GalleryImage src={main?.photoUrl} sizes="66vw" priority />
      </div>

      {/* SMALLER IMAGES */}
      <div className="flex flex-col w-1/3 gap-3 lg:gap-4 xl:gap-6">
        <div className="relative w-full aspect-16/10 overflow-hidden rounded-xl shadow-md">
          <GalleryImage src={second?.photoUrl} sizes="33vw" />
        </div>
        <div className="relative w-full aspect-16/10 overflow-hidden rounded-xl shadow-md">
          <GalleryImage src={third?.photoUrl} sizes="33vw" />
          <button
            type="button"
            onClick={handleOpeningModal}
            className="absolute bottom-2 right-2 py-1 px-5 bg-[#FFF]/80 border-[0.5px] border-[#D4D4D4] inset-shadow-glass rounded-xl hover:cursor-pointer"
          >
            Galeria
          </button>
        </div>
      </div>
    </div>
  )
}
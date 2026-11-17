import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import defaultImage from "@/../public/default_user_image.png"
import type { BusinessCardData } from "@/lib/business-card"
import { cn, createLinkFormat } from "@/utils"

const formatRating = (rating: number) =>
  rating.toLocaleString("pl-PL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })

type BusinessCardProps = {
  service: BusinessCardData
  className?: string
}

export const BusinessCard = ({ service, className }: BusinessCardProps) => {
  const { id, name, image, category, town, district, averageRating, reviewCount } = service

  return (
    <Link
      href={createLinkFormat(id, name)}
      className={cn(
        "group flex h-[250px] w-[220px] flex-col overflow-clip rounded-2xl border border-[#E5E5EA] bg-white transition-colors duration-200 ease-in-out hover:border-[#D4D4D9] focus-visible:border-[#191919] focus-visible:outline-none xl:h-[310px] xl:w-[280px]",
        className
      )}
    >
      {/* IMAGE */}
      <div className="relative h-1/2 w-full overflow-hidden xl:h-[57%]">
        <Image
          src={image || defaultImage}
          alt={name}
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="relative flex h-1/2 flex-col gap-2 rounded-b-xl px-2 py-4 xl:h-[43%]">
        <h3 className="line-clamp-1 text-[15px] font-medium leading-5 tracking-tight text-black">{name}</h3>

        <div className="flex flex-col gap-1">
          <p className="line-clamp-1 text-[13px] font-normal tracking-tight text-[#8A8A8C] lg:font-medium">
            {district} | {town}
          </p>

          <div className="flex flex-row items-center gap-0.5">
            {reviewCount === 0 || averageRating === null ? (
              <p className="text-[13px] text-[#111]">Brak opinii</p>
            ) : (
              <>
                <p className="text-[13px] font-medium text-[#111]">{formatRating(averageRating)}</p>
                <Star fill="gold" size={15} stroke="none" aria-hidden />
                <p className="ml-1 text-[13px] font-light text-[#111]">({reviewCount})</p>
              </>
            )}
          </div>
        </div>

        <p className="absolute bottom-2 left-2 rounded-lg bg-[#F2F2F7] px-2 py-1 text-xs text-[#191919] ring-[0.5px] ring-[#D4D4D4] lg:bottom-2.5">
          {category}
        </p>
      </div>
    </Link>
  )
}
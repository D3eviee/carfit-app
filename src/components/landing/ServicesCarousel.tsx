import type { BusinessListResult } from "@/lib/data/landing"
import { BusinessCard } from "./BusinessCard"

type ServicesCarouselProps = {
  result: BusinessListResult
  emptyMessage: string
}

export const ServicesCarousel = ({ result, emptyMessage }: ServicesCarouselProps) => {
  if (!result.success) 
    return <p className="text-sm font-light text-[#333]">{result.message}</p>
    
  if (result.data.length === 0) 
    return <p className="text-sm font-light text-[#333]">{emptyMessage}</p>

  return (
    <ul className="flex w-full snap-x snap-mandatory flex-row gap-5 overflow-x-auto pr-4 scrollbar-none">
      {result.data.map((service) => (
        <li key={service.id} className="shrink-0 snap-start">
          <BusinessCard service={service} />
        </li>
      ))}
    </ul>
  )
}
import { BusinessCard } from "../landing/BusinessCard"
import { toCardData } from "@/lib/business-card"

type SearchResultGridProps = {
  data: {
    id: string
    name: string
    image: string | null
    category: string
    town: string
    district: string
    street: string
    zipcode: string
    reviews: { rate: number }[]
  }[]
}

export default function SearchResultGrid({ data }: SearchResultGridProps) {
  return (
    <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:gap-8">
      {data.map((service) => (
        <li key={service.id}>
          <BusinessCard service={toCardData(service)} className="w-full xl:w-full" />
        </li>
      ))}
    </ul>
  )
}
import BusinessCard from "../landing/business-card"

type SearchResultGridProps = {
    data: {
        id: string
        name: string
        image: string
        category: string
        town: string
        district: string,
        street: string
        zipcode: string  
        reviews: {
            rate: number
        }[]
    }[]
}

export default function SearchResultGrid({data}: SearchResultGridProps) {
  return (
    <div className='w-full grid grid-cols-3 gap-8'>
        {data.map((service, i) => 
            <BusinessCard
                key={i}
                serviceData={service}
            />
        )}
    </div>
  )
}

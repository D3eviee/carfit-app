export type BusinessCardData = {
  id: string
  name: string
  image: string | null
  category: string
  town: string
  district: string
  averageRating: number | null
  reviewCount: number
}

// Turns { ...business, reviews: { rate }[] } into card data with a computed rating.
// Extra fields (street, zipcode...) are kept.
export function toCardData<T extends { reviews: { rate: number }[] }>({ reviews, ...business }: T) {
  const reviewCount = reviews.length
  const averageRating = reviewCount
    ? reviews.reduce((sum, r) => sum + r.rate, 0) / reviewCount
    : null

  return { ...business, averageRating, reviewCount }
}
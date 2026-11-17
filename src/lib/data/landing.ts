import "server-only";
import prisma from "../db";

const businessCardSelect = {
  id: true,
  name: true,
  image: true,
  category: true,
  town: true,
  district: true,
  reviews: { select: { rate: true } },
} as const;

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

export type BusinessListResult =
  | { success: true; data: BusinessCardData[] }
  | { success: false; message: string }


type BusinessWithRates = Omit<BusinessCardData, "averageRating" | "reviewCount"> & {
  reviews: { rate: number }[]
}

const toCardData = ({ reviews, ...business }: BusinessWithRates): BusinessCardData => {
  const reviewCount = reviews.length
  const averageRating = reviewCount
    ? reviews.reduce((sum, r) => sum + r.rate, 0) / reviewCount
    : null

  return { ...business, averageRating, reviewCount }
}

const FAILURE: BusinessListResult = {
  success: false,
  message: "Nie udało się pobrać serwisów. Spróbuj ponownie później.",
}

// "Polecane": best-rated among the 50 most-reviewed public businesses
export const getRecommendedServices = async (): Promise<BusinessListResult> => {
  try {
    const candidates = await prisma.business.findMany({
      select: businessCardSelect,
      where: { isPublic: true },
      orderBy: { reviews: { _count: "desc" } },
      take: 50,
    })

    const data = candidates
      .map(toCardData)
      .sort((a, b) =>
        (b.averageRating ?? 0) - (a.averageRating ?? 0) || b.reviewCount - a.reviewCount
      )
      .slice(0, 15)

    return { success: true, data }
  } catch (error) {
    console.error("getRecommendedServices failed:", error)
    return FAILURE
  }
}

// "Nowe w CarFit": most recently created public businesses
export const getNewServices = async (): Promise<BusinessListResult> => {
  try {
    const businesses = await prisma.business.findMany({
      select: businessCardSelect,
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      take: 15,
    })

    return { success: true, data: businesses.map(toCardData) }
  } catch (error) {
    console.error("getNewServices failed:", error)
    return FAILURE
  }
}
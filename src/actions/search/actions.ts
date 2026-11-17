'use server'
import prisma from "@/lib/db"

const MAX_RESULTS = 50
const MAX_INPUT_LENGTH = 100

const searchResultSelect = {
  id: true,
  name: true,
  image: true,
  category: true,
  town: true,
  district: true,
  street: true,
  zipcode: true,
  reviews: {
    select: {
      rate: true,
    },
  },
} as const

// Server actions are public endpoints – never trust the arguments
const cleanInput = (value: unknown) =>
  typeof value === "string" ? value.trim().slice(0, MAX_INPUT_LENGTH) : ""

export const searchBusinesses = async (location?: string, category?: string) => {
  const town = cleanInput(location)
  const type = cleanInput(category)

  try {
    const data = await prisma.business.findMany({
      where: {
        isPublic: true,
        ...(town ? { town: { equals: town, mode: "insensitive" as const } } : {}),
        ...(type ? { category: { equals: type, mode: "insensitive" as const } } : {}),
      },
      select: searchResultSelect,
      orderBy: { reviews: { _count: "desc" } },
      take: MAX_RESULTS,
    })

    return { success: true as const, data }
  } catch (error) {
    console.error("searchBusinesses failed:", { town, type, error })
    return { success: false as const, message: "Nie udało się pobrać wyników wyszukiwania" }
  }
}
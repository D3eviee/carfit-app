'use server'
import prisma from "@/lib/db"

const MAX_SUGGESTIONS = 8
const MAX_INPUT_LENGTH = 100

// Server actions are public endpoints – never trust the arguments
const cleanInput = (value: unknown) =>
  typeof value === "string" ? value.trim().slice(0, MAX_INPUT_LENGTH) : ""

// Businesses whose name contains the query – for the "Serwisy" list in the category dropdown
export const getServiceSuggestions = async (query: string) => {
  const q = cleanInput(query)
  if (q.length < 2) return { success: true as const, data: [] }

  try {
    const data = await prisma.business.findMany({
      where: {
        isPublic: true,
        name: { contains: q, mode: "insensitive" },
      },
      select: { id: true, name: true, image: true },
      orderBy: { name: "asc" },
      take: MAX_SUGGESTIONS,
    })

    return { success: true as const, data }
  } catch (error) {
    console.error("getServiceSuggestions failed:", { q, error })
    return { success: false as const, message: "Nie udało się pobrać serwisów" }
  }
}

// Distinct towns that have at least one public business – for the location dropdown
export const getLocationSuggestions = async (query: string) => {
  const q = cleanInput(query)
  if (q.length < 3) return { success: true as const, data: [] }

  try {
    const data = await prisma.business.findMany({
      where: {
        isPublic: true,
        town: { contains: q, mode: "insensitive" },
      },
      select: { town: true },
      distinct: ["town"],
      orderBy: { town: "asc" },
      take: MAX_SUGGESTIONS,
    })

    return { success: true as const, data }
  } catch (error) {
    console.error("getLocationSuggestions failed:", { q, error })
    return { success: false as const, message: "Nie udało się pobrać lokalizacji" }
  }
}
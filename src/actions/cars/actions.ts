'use server'
import prisma from "@/lib/db"
import { userAuth } from "@/lib/auth"

export async function getClientCars() {
  const user = await userAuth()
  if (!user.success) return { success: false as const, message: "Brak dostępu. Zaloguj się" }

  try {
    const client = await prisma.client.findUnique({
      where: { id: user.id },
      select: {
        cars: {
          where: { archived: false },
          select: { id: true, brand: true, model: true, year: true },
          orderBy: { year: "desc" },
        },
      },
    })

    return { success: true as const, data: client?.cars ?? [] }
  } catch (error) {
    console.error("getClientCars", error)
    return { success: false as const, message: "Wystąpił problem podczas pobierania danych" }
  }
}
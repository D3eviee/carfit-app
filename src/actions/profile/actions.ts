import { userAuth } from "@/lib/auth"
import prisma from "@/lib/db"

export const getClientProfileData = async () => {
  const user = await userAuth()
  if (!user.success) return { success: false as const, message: "Brak dostępu. Zaloguj się" }

  try {
    const userData = await prisma.client.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        image: true,
        name: true,
        phone: true,
        createdAt: true,
        reservation: { select: { charge: true } },
        cars: {
          where: { archived: false },
          select: { id: true, brand: true, model: true, year: true },
          orderBy: { year: "desc" },
        },
      },
    })

    if (!userData) return { success: false as const, message: "Nie znaleziono konta" }
    return { success: true as const, data: userData }
  } catch (error) {
    console.error("getClientProfileData", error)
    return { success: false as const, message: "Wystąpił problem podczas pobierania danych" }
  }
}
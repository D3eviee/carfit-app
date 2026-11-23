'use server'
import prisma from "@/lib/db"
import { sortScheduleByDay } from "@/utils"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const FETCH_ERROR = "Wystąpił problem podczas pobierania danych"
const INVALID_INPUT = "Nieprawidłowe dane"
const MAX_RANGE_MS = 45 * 24 * 60 * 60 * 1000

// Every active reservation that overlaps [from, to)
export async function getReservationsInRange(businessId: string, fromIso: string, toIso: string) {
  const from = new Date(fromIso)
  const to = new Date(toIso)

  if (
    !UUID_RE.test(businessId) ||
    Number.isNaN(from.getTime()) ||
    Number.isNaN(to.getTime()) ||
    to <= from ||
    to.getTime() - from.getTime() > MAX_RANGE_MS
  ) {
    return { success: false as const, message: INVALID_INPUT }
  }

  try {
    const data = await prisma.reservation.findMany({
      where: {
        businessId,
        status: "reserved",
        reservationStart: { lt: to },
        reservationEnd: { gt: from },
      },
      select: {
        reservationStart: true,
        reservationEnd: true,
        duration: true,
      },
      orderBy: { reservationStart: "asc" },
    })

    return { success: true as const, data }
  } catch (error) {
    console.error("getReservationsInRange", error)
    return { success: false as const, message: FETCH_ERROR }
  }
}

export async function getBusinessWorkingHours(businessId: string) {
  if (!UUID_RE.test(businessId)) {
    return { success: false as const, message: INVALID_INPUT }
  }

  try {
    const days = await prisma.workingDay.findMany({
      where: { serviceId: businessId },
      select: {
        dayOfWeek: true,
        isOpen: true,
        open: true,
        close: true,
      },
    })

    return { success: true as const, data: sortScheduleByDay(days) }
  } catch (error) {
    console.error("getBusinessWorkingHours", error)
    return { success: false as const, message: FETCH_ERROR }
  }
}
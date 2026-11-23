"use server"

import prisma from "@/lib/db"
import { addMinutes } from "date-fns"
import { userAuth } from "@/lib/auth"
import { DAYS_OF_WEEK, getWarsawTime, timeToMinutes } from "@/utils"
import { addReservation } from "@/app/(landing)/actions"
import { getBookingCategories } from "@/lib/data/business"

type CreateReservationInput = {
  businessId: string
  serviceIds: string[]
  start: string // ISO date
  clientMessage: string
  clientCar: string
}

export type CreateReservationErrorCode = "UNAUTHENTICATED" | "INVALID" | "SLOT_TAKEN" | "SERVER_ERROR"

export type CreateReservationResult =
  | { success: true }
  | { success: false; code: CreateReservationErrorCode; message: string }

const SERVER_ERROR_MESSAGE = "Nie udało się zarezerwować wizyty. Spróbuj ponownie"

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : ""

const fail = (code: CreateReservationErrorCode, message: string): CreateReservationResult => ({
  success: false,
  code,
  message,
})

export const createReservation = async (input: CreateReservationInput): Promise<CreateReservationResult> => {
  const user = await userAuth()
  if (!user.success) return fail("UNAUTHENTICATED", "Zaloguj się, aby zarezerwować wizytę")

  const start = new Date(input.start)
  const serviceIds = [
    ...new Set(Array.isArray(input.serviceIds) ? input.serviceIds.filter((id) => typeof id === "string") : []),
  ]

  if (Number.isNaN(start.getTime()) || serviceIds.length === 0 || serviceIds.length > 20) {
    return fail("INVALID", "Nieprawidłowe dane rezerwacji")
  }
  if (start <= new Date()) return fail("INVALID", "Wybrany termin już minął")

  try {
    // Price and duration come from the database – never from the browser
    const categories = await getBookingCategories(input.businessId)
    if (!categories) return fail("INVALID", "Nie znaleziono warsztatu")

    const services = categories.flatMap((c) => c.services).filter((s) => serviceIds.includes(s.id))
    if (services.length !== serviceIds.length) return fail("INVALID", "Wybrane usługi są niedostępne")

    const duration = services.reduce((sum, s) => sum + Number(s.duration), 0)
    const charge = services.reduce((sum, s) => sum + Number(s.price), 0)
    const end = addMinutes(start, duration)

    // Must fit inside opening hours (Polish time)
    const business = await prisma.business.findFirst({
      where: { id: input.businessId },
      select: { workingDays: { select: { dayOfWeek: true, isOpen: true, open: true, close: true } } },
    })
    const startPl = getWarsawTime(start)
    const endPl = getWarsawTime(end)
    const day = business?.workingDays.find((d) => d.dayOfWeek === DAYS_OF_WEEK[startPl.dayIndex])

    if (
      !day?.isOpen ||
      startPl.dayIndex !== endPl.dayIndex ||
      startPl.minutes < timeToMinutes(day.open) ||
      endPl.minutes > timeToMinutes(day.close)
    ) {
      return fail("INVALID", "Wybrany termin jest poza godzinami otwarcia")
    }

    // Slot must still be free (someone may have booked it since the page loaded)
    const overlapping = await prisma.reservation.findFirst({
      where: {
        businessId: input.businessId,
        status: "reserved",
        reservationStart: { lt: end },
        reservationEnd: { gt: start },
      },
      select: { id: true },
    })
    if (overlapping) return fail("SLOT_TAKEN", "Ten termin został właśnie zajęty. Wybierz inną godzinę")

    const response = await addReservation({
      businessId: input.businessId,
      servicesIds: serviceIds,
      reservationStart: start,
      reservationEnd: end,
      duration,
      charge,
      status: "reserved",
      clientMessage: cleanText(input.clientMessage, 1000) || null,
      clientCar: cleanText(input.clientCar, 100) || null,
    })

    if (!response.success) return fail("SERVER_ERROR", SERVER_ERROR_MESSAGE)
    return { success: true }
  } catch (error) {
    console.error("createReservation failed:", error)
    return fail("SERVER_ERROR", SERVER_ERROR_MESSAGE)
  }
}
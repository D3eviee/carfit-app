import { addMinutes, set } from "date-fns"
import type { BookingReservationData, Service } from "@/lib/types"
import { timeToMinutes } from "@/utils"

export const getBookingTotals = (services: Service[], selectedIds: string[]) => {
  const selected = services.filter((service) => selectedIds.includes(service.id))
  return {
    selected,
    totalPrice: selected.reduce((sum, s) => sum + Number(s.price), 0),
    totalDuration: selected.reduce((sum, s) => sum + Number(s.duration), 0),
  }
}

const atTime = (date: Date, time: string) => {
  const minutes = timeToMinutes(time)
  return set(date, { hours: Math.floor(minutes / 60), minutes: minutes % 60, seconds: 0, milliseconds: 0 })
}

type SlotOptions = {
  date: Date
  open: string
  close: string
  duration: number
  reservations: BookingReservationData[]
  now?: Date
  step?: number
}

// Start times where the whole visit fits before closing, doesn't overlap a reservation and isn't in the past
export const getAvailableSlots = ({ date, open, close, duration, reservations, now = new Date(), step = 15 }: SlotOptions) => {
  const opening = atTime(date, open)
  const closing = atTime(date, close)
  const visitLength = Math.max(duration, 1)
  const slots: Date[] = []

  for (let start = opening; start < closing; start = addMinutes(start, step)) {
    const end = addMinutes(start, visitLength)
    if (end > closing) break
    if (start <= now) continue

    const overlaps = reservations.some(
      (r) => start < new Date(r.reservationEnd) && end > new Date(r.reservationStart)
    )
    if (!overlaps) slots.push(start)
  }

  return slots
}
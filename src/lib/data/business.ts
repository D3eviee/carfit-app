import "server-only"
import { cache } from "react"
import prisma from "@/lib/db"
import { sortScheduleByDay } from "@/utils"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// cache(): generateMetadata and the page share one DB query per request
export const getServiceData = cache(async (id: string) => {
  if (!UUID_RE.test(id)) return null

  const business = await prisma.business.findFirst({
    where: { id, isPublic: true },
    select: {
      name: true,
      phone: true,
      category: true,
      description: true,
      town: true,
      zipcode: true,
      district: true,
      street: true,
      images: { orderBy: { priority: "asc" } },
      facebookUrl: true,
      instagramUrl: true,
      websiteUrl: true,
      reviews: {
        select: {
          id: true,
          rate: true,
          title: true,
          content: true,
          createdAt: true,
          client: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      workingDays: {
        select: { open: true, close: true, dayOfWeek: true, isOpen: true },
      },
      categories: {
        where: { archived: false },
        select: {
          id: true,
          name: true,
          services: {
            select: {
              id: true,
              categoryId: true,
              name: true,
              description: true,
              duration: true,
              price: true,
            },
          },
        },
      },
    },
  })

  if (!business) return null

  // Sort once here – Poniedziałek → Niedziela – so no component has to
  return { ...business, workingDays: sortScheduleByDay(business.workingDays) }
})

// categories + services for the booking page (public businesses only)
export const getBookingCategories = cache(async (businessId: string) => {
  if (!UUID_RE.test(businessId)) return null

  const business = await prisma.business.findFirst({
    where: { id: businessId, isPublic: true },
    select: {
      categories: {
        where: { archived: false },
        select: {
          id: true,
          name: true,
          services: {
            select: { id: true, categoryId: true, name: true, description: true, duration: true, price: true },
          },
        },
      },
    },
  })

  return business?.categories ?? null
})
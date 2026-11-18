import "server-only"
import { cache } from "react"
import prisma from "@/lib/db"
import { authRole } from "@/lib/auth"
import type { NavbarUser } from "@/lib/types"

const profileSelect = { name: true, phone: true, image: true } as const

// cache(): several components can call this in one request and hit the DB once
export const getNavbarUserData = cache(async (): Promise<NavbarUser> => {
    const auth = await authRole()

  try {
    if (auth.role === "CLIENT") {
      const client = await prisma.client.findUnique({ where: { id: auth.id }, select: profileSelect })
      if (client) return { role: "CLIENT", ...client }
    }

    if (auth.role === "BUSINESS") {
      const business = await prisma.business.findUnique({ where: { id: auth.id }, select: profileSelect })
      if (business) return { role: "BUSINESS", ...business }
    }
  } catch (error) {
    console.error("getNavbarUserData failed:", error)
  }

  // Not logged in, account deleted, or DB error → render as guest instead of crashing
  return { role: "NONAUTHORIZED" }
})
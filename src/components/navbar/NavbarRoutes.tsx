import type { ReactNode } from "react"
import {
  Briefcase,
  CalendarDays,
  Headset,
  LayoutDashboard,
  LogIn,
  Megaphone,
  User,
} from "lucide-react"

export type NavRoute = {
  label: string
  href: string
  icon: ReactNode
  primary?: boolean
}

export const SUPPORT_ROUTE: NavRoute = {
  label: "Pomoc",
  href: "/support",
  icon: <Headset size={18} strokeWidth={1.5} />,
}

export const GUEST_ROUTES: NavRoute[] = [
  SUPPORT_ROUTE,
  { label: "Dla biznesu", href: "/business", icon: <Briefcase size={18} strokeWidth={1.5} />, primary: true },
  { label: "Zaloguj", href: "/sign-in", icon: <LogIn size={18} strokeWidth={1.5} />, primary: true },
]

export const BUSINESS_ROUTES: NavRoute[] = [
  SUPPORT_ROUTE,
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} strokeWidth={1.5} />, primary: true },
]

export const CLIENT_ROUTES: NavRoute[] = [
  { label: "Profil", href: "/user/profile", icon: <User size={18} strokeWidth={1.5} /> },
  { label: "Wizyty", href: "/user/appointments", icon: <CalendarDays size={18} strokeWidth={1.5} /> },
  { label: "Ogłoszenia", href: "/user/announcements", icon: <Megaphone size={18} strokeWidth={1.5} /> },
]
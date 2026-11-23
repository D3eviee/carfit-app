export type BusinessNavLink = {
  label: string
  href: string
  variant: "light" | "dark"
}

export const BUSINESS_NAV_LINKS: BusinessNavLink[] = [
  { label: "Home", href: "/", variant: "light" },
  { label: "Wsparcie", href: "/support", variant: "dark" },
  { label: "Zaloguj", href: "/business/sign-in", variant: "dark" },
]
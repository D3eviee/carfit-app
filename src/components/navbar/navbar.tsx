import Link from "next/link";
import { NavbarMobileMenuButton } from "./NavbarMobileMenuButton";
import { NavbarProfile } from "./NavbarProfile";
import { getNavbarUserData } from "@/lib/data/navbar";
import { cn } from "@/utils";
import { BUSINESS_ROUTES, GUEST_ROUTES } from "./NavbarRoutes";

export const Navbar = async () =>  {
  // get user data and veryfiy user role
  const user = await getNavbarUserData()
  const routes = user.role === "BUSINESS" ? BUSINESS_ROUTES : GUEST_ROUTES

  return (
    <header className="flex flex-row items-center justify-between px-4 py-5 xl:px-20 2xl:px-36">
      {/* Logo */}
      <Link href="/" className="text-2xl font-semibold text-[#191919]">CarFit</Link>

      {/* Mobile */}
      <NavbarMobileMenuButton user={user} />
      
      {/* Desktop */}
      <nav aria-label="Główna nawigacja" className="hidden items-center gap-5 md:flex">
        {user.role === "CLIENT" ? (
          <NavbarProfile user={user} />
        ) : (
          routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn("rounded-[5px] px-4 py-1 text-sm font-medium transition-colors active:scale-xs", 
                route.primary ? "bg-[#151C24] text-white hover:bg-[#262D35]" : "bg-[#F0EEEF] text-[#191919] hover:bg-[#E4E4E4]")}
            >
              {route.label}
            </Link>
          ))
        )}
      </nav>
    </header>
  )
}
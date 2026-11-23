import Link from "next/link";
import { cn } from "@/utils"
import { BusinessNavbarMobileMenuButton } from "./BusinessNavbarMobileMenuButton";
import { BUSINESS_NAV_LINKS } from "./BusinessNavbarLinks";

const linkVariants = {
  light: "text-[#151C24] bg-[#F0EEEF] hover:bg-[#E4E4E4]",
  dark: "bg-[#151C24] text-[#FFF] hover:bg-[#262D35]",
}

export const BusinessNavbar = () => {
  return (
   <header className="flex flex-row items-center justify-between py-5 px-4 xl:px-20 2xl:px-36">
      {/* LOGO */}
      <Link href="/" className="font-semibold text-2xl md:text-2xl">CarFit</Link>

      {/* OPEN MOBILE MENU BUTTON FOR MOBILE DEVICES */}
      <BusinessNavbarMobileMenuButton />

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex flex-row gap-5">
        {BUSINESS_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn("py-1 px-4 text-sm font-medium rounded-[5px]", linkVariants[link.variant])}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
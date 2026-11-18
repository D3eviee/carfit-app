'use client'
import { NavbarUser } from "@/lib/types";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { useMobileNavigationStore } from "@/lib/store";

// this component provides button for opening mobile navigation menu
export const  NavbarMobileMenuButton = ({ user }:{ user : NavbarUser }) => {
  const openMenu = useMobileNavigationStore((store) => store.openMenu)

  return (
    <button
      type="button"
      aria-label="Otwórz menu"
      onClick={() => openMenu(<NavbarMobileMenu user={user} />)}
      className="rounded-[4px] bg-linear-to-b from-[#313131] to-[#141414] px-5 py-1 text-white md:hidden"
    >
      Menu
    </button>
  )
}


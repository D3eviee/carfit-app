'use client'
import { useState } from "react";
import { NavbarProfileProps } from "@/lib/types";
import NavbarMobileMenu from "./navbar-mobile-menu";

// this component provides button for opening mobile navigation menu
export default function NavbarMobileMenuButton({userData}:{userData:NavbarProfileProps}) {
  const [isMenuOpen, setIsMenuOpen] =  useState(false)

  const handleOpeningMenu = () => {
        document.body.style.overflow = "hidden"
        setIsMenuOpen(true)
    }

  return (
    <>
      <div
        className="py-1.5 px-6 bg-[#151C24] text-sm text-[#FFF] font-medium rounded-[5px] md:hidden" 
        onClick={handleOpeningMenu}
      >Menu</div>
      <NavbarMobileMenu isOpen={isMenuOpen} onClose={() => {setIsMenuOpen(false)}} userData={userData}/>
    </>
  )
}
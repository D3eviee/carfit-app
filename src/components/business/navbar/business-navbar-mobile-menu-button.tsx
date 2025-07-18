'use client'
import { useState } from "react";
import BusinessNavbarMobileMenu from "./business-navbar-mobile-menu";

// this component provides button for opening mobile navigation menu
export default function BusinessNavbarMobileMenuButton() {
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
      <BusinessNavbarMobileMenu isOpen={isMenuOpen} onClose={() => {setIsMenuOpen(false)}}/> 
    </>
  )
}
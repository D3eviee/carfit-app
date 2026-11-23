'use client'
import { useCallback, useState } from "react"
import { BusinessNavbarMobileMenu } from "./BusinessNavbarMobileMenu"

// this component provides button for opening mobile navigation menu
export const BusinessNavbarMobileMenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  return (
    <>
      <button
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="business-mobile-menu"
        onClick={() => setIsMenuOpen(true)}
        className="py-1.5 px-6 bg-[#151C24] text-sm text-[#FFF] font-medium rounded-[5px] md:hidden" 
      >
        Menu
      </button>
      <BusinessNavbarMobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}

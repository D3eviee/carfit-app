'use client'
import { useEffect } from "react"
import Link from "next/link"
import { ChevronRight, X } from "lucide-react"
import { cn } from "@/utils"
import { BUSINESS_NAV_LINKS } from "./BusinessNavbarLinks"

type BusinessNavbarMobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export const BusinessNavbarMobileMenu = ({ isOpen, onClose }: BusinessNavbarMobileMenuProps) => {
  // Lock page scroll and listen for Escape only while open – cleanup always unlocks
  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = "hidden"
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div
      id="business-mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!isOpen}
      className={cn(
        "fixed top-0 left-0 h-screen w-full bg-white p-4 z-50 transition-all duration-300 ease-in-out md:hidden",
        isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"
      )}
    >
      <div className="relative h-full flex flex-col gap-10">
        {/* Closing bar */}
        <div className="w-full flex justify-end">
          <button type="button" aria-label="Zamknij menu" onClick={onClose}>
            <X size={25} color="#151C24" strokeWidth={1} />
          </button>
        </div>
        
        {/* Navigation links */}
        <div className="h-full flex flex-col justify-between">
          <nav className="flex flex-col gap-3">
            {BUSINESS_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="px-3 py-5 rounded-md hover:bg-[#F9FAFC]"
              >
                <div className="flex flex-row justify-between">
                  <p className="text-base text-[#151C24] font-medium">{link.label}</p>
                  <ChevronRight strokeWidth={1.5} color="#151C24" />
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
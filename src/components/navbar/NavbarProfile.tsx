'use client'
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavbarProfileData } from "@/lib/types";
import { NavbarAvatar } from "./NavbarAvatar";
import { cn } from "@/utils";
import NavbarProfileDropdown from "./NavbarProfileDropdown";

// the purpose of this component is to dispaly small profile header in navigation bar when client is loged in
export const NavbarProfile = ({ user }:{ user: NavbarProfileData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Close on click outside / Escape – listeners only exist while open
  useEffect(() => {
    if (!isOpen) return
    
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])
  
  return (
     <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-xl p-2 hover:bg-[#F2F2F7]"
      >
        <NavbarAvatar image={user.image} />
        <span className="flex items-center gap-0.5">
          <span className="text-xs font-normal text-[#191919]">{user.name}</span>
          <ChevronDown
            aria-hidden
            color="#363638"
            size={20}
            strokeWidth={1}
            className={cn("mt-px transition-transform duration-150", isOpen && "rotate-180")}
          />
        </span>
      </button>

      {isOpen && <NavbarProfileDropdown user={user} onClose={() => setIsOpen(false)} />}
    </div>
  )
}
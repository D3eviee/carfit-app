'use client'
import { useState } from "react"
import { LogOut } from "lucide-react"
import { SidebarLogouttModal } from "./sidebar-logout-modal"

export const SidebarLogoutButton = () => {
   const [isOpen, setIsOpen] = useState(false)


  return (
    <>
      <div onClick={() => setIsOpen(true)} className="w-full py-1 px-2 flex flex-row items-center gap-2 rounded-lg hover:cursor-pointer hover:bg-[#F2F2F2]">
        <LogOut size={18} strokeWidth={1.5} className="text-[#FA6A5C]"/>
        <p className="text-sm text-[#FA6A5C]">Wyloguj</p>
      </div>
      <SidebarLogouttModal  open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
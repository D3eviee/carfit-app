'use client'
import { LogOut } from "lucide-react"
import { useDashboardSidebar, useModalStore } from "@/lib/store"
import { LogoutModal } from "@/components/modals/LogoutModal"
import { cn } from "@/utils"

export const SidebarLogoutButton = () => {
  const openModal = useModalStore(store => store.openModal)
  const handleLogoutModal = () => openModal(<LogoutModal/>)
  const isMenuOpen = useDashboardSidebar(store => store.isMenuOpen)

  return (
      <div 
        onClick={handleLogoutModal} 
        className={cn("w-full py-1 px-2 flex flex-row items-center gap-2 rounded-lg hover:cursor-pointer hover:bg-[#F2F2F2] active:scale-95", 
          isMenuOpen ? "justify-start" : "justify-center")}
      >
        <LogOut size={18} strokeWidth={1.5} className="text-[#FF383C]"/>
        {isMenuOpen && <p className="text-sm text-[#FF383C]">Wyloguj</p>}
      </div>
  )
}
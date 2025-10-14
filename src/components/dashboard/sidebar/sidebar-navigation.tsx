'use client'
import { usePathname } from "next/navigation"
import { SidebarNavigationProfile } from "./sidebar-navigation-profile"
import { SidebarNavigationSubpages } from "./sidebar-navigation-subpages"
import { SidebarNavigationOptions } from "./sidebar-navigation-options"
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react"
import { cn } from "@/utils"
import { useDashboardSidebar } from "@/lib/store"

export const SidebarNavigation = () => {
  const activePage = usePathname()
  const isMenuOpen = useDashboardSidebar(store => store.isMenuOpen)
  const toggleSidebar = useDashboardSidebar(store => store.toggleMenu)

  return (
    <aside 
      className={cn("h-full flex-col justify-between py-8 px-3 bg-[#FAFAFA] border-r border-r-[#D4D4D4] hidden lg:flex transition-all duration-200",
        isMenuOpen ? "w-58" : "w-18"
      )

      }>
      {/* logo and subsides */}
      <div className="w-full flex flex-col gap-7">
        <div className="w-full flex flex-row justify-between items-center">
          {isMenuOpen && <h1 className="text-xl text-[#121212] leading-5 font-bold">CarFit</h1>}
          <div className={cn("flex w-full", isMenuOpen ? "justify-end" : "justify-center")}>
              { isMenuOpen ? <ArrowLeftToLine strokeWidth={1.5}  onClick={toggleSidebar} className="text-[#7B7C7E] hover:text-[#000] hover:cursor-pointer hover:scale-105"/>
              : <ArrowRightToLine strokeWidth={1.5} onClick={toggleSidebar}  className="text-[#7B7C7E] hover:text-[#000] hover:cursor-pointer  hover:scale-105"/>
            }
          </div>
        </div>
        
        <SidebarNavigationSubpages activePage={activePage}/>
      </div>

      {/* Setting and account */}
      <div className="w-full flex flex-col gap-5">
        <SidebarNavigationOptions activePage={activePage}/>
        <SidebarNavigationProfile/>
      </div>
    </aside>
  )
}
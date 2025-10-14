'use client'
import { useDashboardSidebar } from "@/lib/store"
import { cn } from "@/utils"
import { Book, Calendar, Home, Wrench, Store } from "lucide-react"
import Link from "next/link"

 const dashboardPages = [
    { link: "/dashboard", text: "Home", icon: Home },
    { link: "/dashboard/calendar", text: "Kalendarz", icon: Calendar },
    { link: "/dashboard/appointments", text: "Wizyty", icon: Book },
    { link: "/dashboard/services", text: "Usługi", icon: Wrench },
    { link: "/dashboard/listings", text: "Ogłoszenia", icon:  Store},
  ]

export const SidebarNavigationSubpages = ({activePage}:{activePage:string}) => {
  const isMenuOpen = useDashboardSidebar(store => store.isMenuOpen)

  return (
    <div className="flex flex-col gap-2.5 ">
      {dashboardPages.map((path, index) => {
        const isActive =  activePage == path.link
        const Icon = path.icon
        
        return (
          <Link href={path.link} key={index}>
            <div 
              className={cn("w-full py-1.5 px-2 flex flex-row items-center gap-2 rounded-lg hover:bg-[#F2F2F2] active:scale-95 text-center", 
              isActive && "bg-[#FFF] ring-[0.5px] ring-[#DFDFE1] shadow-md hover:bg-[#FFF]",
              isMenuOpen ? "justify-start" : "justify-center")}
            >
              <Icon size={isMenuOpen ? 18 : 20} strokeWidth={isActive ? 2 : 1.5} className={cn("text-[#6C6C6C]", isActive && "text-[#121212]")}/>
              {isMenuOpen && <p className={cn("text-sm text-[#6C6C6C]", isActive && "text-[#121212] font-medium")}>{path.text}</p>}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
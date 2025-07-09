'use client'
import { cn } from "@/utils"
import { Book, Calendar, HelpCircle, Home, LogOut, Settings, Wrench } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarNavigationProfile } from "./sidebar-navigation-profile"
import { SidebarLogoutButton } from "./sidebar-logout-button"

export const SidebarNavigation = () => {

  const activePage = usePathname()

  const dashboardPages = [
    { link: "/dashboard", text: "Home", icon: Home },
    { link: "/dashboard/calendar", text: "Kalendarz", icon: Calendar },
    { link: "/dashboard/appointments", text: "Wizyty", icon: Book },
    { link: "/dashboard/services", text: "Usługi", icon: Wrench },
  ]

  const mainPages = [
    { link: "/dashboard/settings", text: "Ustawienia", icon: Settings },
    { link: "/dashboard/support", text: "Pomoc", icon: HelpCircle },
  ]

  return (
    <aside className="min-w-56 max-w-60  h-full flex-col justify-between p-4 bg-[#FAFAFA] border-r lg:flex hidden">
      {/* logo and subsides */}
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-xl text-[#121212] leading-0 font-semibold">CarFit</h1>
        {/* Subsides */}
        <div className="flex flex-col gap-2.5">
          {dashboardPages.map((path, index) => {
            const isActive =  activePage == path.link
            const Icon = path.icon

            return (
              <Link href={path.link} key={index}>
                <div className={cn("w-full  py-1.5 px-2 flex flex-row items-center gap-2 rounded-lg", isActive && "bg-[#FFF] ring-[0.5px] ring-[#DFDFE1] shadow-md")}>
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className={cn("text-[#6C6C6C]", isActive && "text-[#121212]")}/>
                  <p className={cn("text-sm text-[#6C6C6C]", isActive && "text-[#121212] font-medium")}>{path.text}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Setting and account */}
      <div className="w-full flex flex-col gap-5">
        {/* Subsides */}
        <div className="w-full flex flex-col gap-2.5">
          {mainPages.map((path, index) => {
            const isActive =  activePage == path.link
            const Icon = path.icon

            return (
              <Link href={path.link} key={index}>
                <div className={cn("w-full  py-1.5 px-2 flex flex-row items-center gap-2 rounded-lg", isActive && "bg-[#FFF] ring-[0.5px] ring-[#DFDFE1] shadow-md")}>
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className={cn("text-[#7B7C7E]", isActive && "text-[#36373A]")}/>
                  <p className={cn("text-sm text-[#7B7C7E]", isActive && "text-[#36373A] font-medium")}>{path.text}</p>
                </div>
              </Link>
            )
          })}

          <SidebarLogoutButton/>
        </div>

        {/* Account */}
        <SidebarNavigationProfile/>
      </div>
    </aside>
  )
}
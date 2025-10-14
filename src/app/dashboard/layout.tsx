import { SidebarNavigation } from "@/components/dashboard/sidebar/sidebar-navigation";
import { ReactNode } from "react";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import DashboardMobileNavbar from "@/components/dashboard/mobile-navbar/dashboard-mobile-navbar";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="w-full h-svh flex flex-col overflow-hidden lg:flex-row">
      <DashboardMobileNavbar/>
      <SidebarNavigation/>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <DashboardContentContainer>
          {children}
        </DashboardContentContainer>
      </div>
    </div>
  )
}

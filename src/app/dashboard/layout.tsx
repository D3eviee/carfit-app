import NavbarDashboard from "@/components/navbar/navbar-dashboard";
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation";
import { ReactNode } from "react";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";

export default function Layout({children}: {children: ReactNode}) {
  
  return (
    <div className="w-full h-svh flex flex-col overflow-x-hidden">
      <NavbarDashboard />
    <div className="w-full h-full flex flex-row gap-2 overflow-x-hidden0">
        <SidebarNavigation/>
        <DashboardContentContainer>
          {children}
        </DashboardContentContainer>
      </div>
    </div>
  );
}

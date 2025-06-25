import { SidebarNavigation } from "@/components/dashboard/sidebar/sidebar-navigation";
import { ReactNode } from "react";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";

export default function Layout({children}: {children: ReactNode}) {
  
  return (
    <div className="fixed w-full h-svh flex flex-row overflow-hidden">
      <SidebarNavigation/>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <DashboardContentContainer>
          {children}
        </DashboardContentContainer>
      </div>
    </div>
  );
}

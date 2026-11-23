'use client'
import DashboardMobileNavbarMenuItem from "./dashboard-mobile-navbar-menu-item";
import { useMobileNavigationStore } from "@/lib/store";
import { CloseButton } from "@/components/buttons/ButtonClose";
import DashboardMobileNavbarMenuLogoutButton from "./dashboard-mobile-navbar-menu-logout-button";

const DASHBOARD_ROUTES = [
    {label: "Home", path:"/dashboard"},
    {label: "Kalendarz", path:"/dashboard/calendar"},
    {label: "Rezerwacje", path:"/dashboard/appointments"},
    {label: "Usługi", path:"/dashboard/services"},
    {label: "Ustawienia", path:"/dashboard/settings"},
    {label: "Pomoc", path:"/support"},
    {label: "Profil", path:"/dashboard/profile"},
]

export default function DashboardMobileNavbarMenu() {
    const closeMenu = useMobileNavigationStore(store => store.closeMenu)

    return (
        <div className="h-svh w-full absolute top-0 left-0 flex flex-col gap-2 bg-white">
            <div className="w-full flex justify-end px-4 py-2">
                <CloseButton onCloseFn={closeMenu}/>
            </div>
            
            <div className="flex flex-col gap-2 px-3">
                {DASHBOARD_ROUTES.map((route, i) => <DashboardMobileNavbarMenuItem key={i} label={route.label} path={route.path}/>)}
            </div>

            <div className="w-full absolute flex flex-col px-4 bottom-3">
                <DashboardMobileNavbarMenuLogoutButton/>
            </div>
        </div>
    )
}
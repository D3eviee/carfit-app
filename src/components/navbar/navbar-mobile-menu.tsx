'use client'
import { X } from "lucide-react";
import { NavbarProfileProps } from "@/lib/types";
import { cn } from "@/utils";
import NavbarMobileMenuOption from "./navbar-mobile-menu-option";
import NavbarDashboardMobileMenuProfile from "../dashboard/navbar/navbar-dashboard-mobile-menu-profile";

// this component provides mobile menu

type NavbarMobileMenuProps = {
    isOpen: boolean
    onClose: () => void
    userData: NavbarProfileProps
}

export default function NavbarMobileMenu({isOpen, onClose, userData}:NavbarMobileMenuProps) {
    //bocking scroll while menu is open
    const handleClose = () => {
        document.body.style.overflow = ""
        onClose()
    }


    const noUserRoutes = [
        {path: "/business", label: "Dla biznesu" },
        {path: "/support", label: "Pomoc" },
        {path: "/sign-in", label: "Zaloguj" }
    ]

    const clientRoutes = [
        {path: "/user/appointments", label: "Wizyty" },
        {path: "/user/profile", label: "Profil" },
        {path: "/user/support", label: "Pomoc" }
    ]

    const businessRoutes = [
        {path: "/dashboard", label: "Dashboard" },
        {path: "/support", label: "Pomoc" },
    ]

    return ( 
        <div 
            className={cn( "absolute top-0 left-0 h-screen w-full bg-white p-4 z-50 transition-all duration-300 ease-in-out", 
            isOpen ? "opacity-100 translate-y-0 pointer-events-auto": "opacity-0 -translate-y-full pointer-events-none")}
        >
            <div className="relative h-full flex flex-col gap-10">
                {/* Closing bar */}
                <div className="w-full flex justify-end">
                    <X size={25} color="#151C24" onClick={handleClose} strokeWidth={1} className="align-right"/>    
                </div>

                <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-3">
                        {/* Generating routes for no signed user */}
                        {userData.role == "NONAUTHORIZED" && 
                            <>
                            {noUserRoutes.map((route, index) => <NavbarMobileMenuOption key={index} path={route.path} label={route.label} onClose={handleClose}/>)} 
                            </>
                        }

                        {/* Generating routes for logged client */}
                        {userData.role == "CLIENT" && 
                            <>
                            {clientRoutes.map((route, index) => <NavbarMobileMenuOption key={index} path={route.path} label={route.label} onClose={handleClose}/>)} 
                            </>
                        }

                        {/* Generating routes for logged business */}
                        {userData.role == "BUSINESS" && 
                            <>
                            {businessRoutes.map((route, index) => <NavbarMobileMenuOption key={index} path={route.path} label={route.label} onClose={handleClose}/>)} 
                            </>
                        }   
                    </div>

                    {/* Profile indicator */}
                    {userData.role != "NONAUTHORIZED" && <NavbarDashboardMobileMenuProfile closeMenuFn={handleClose} userData={userData}/>}
                </div>
            </div> 
        </div>
    )
}
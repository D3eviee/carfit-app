'use client'
import { useState } from "react";
import { NavbarProfileProps } from "@/lib/types";
import NavbarDashboardMenu from "./navbar-dashboard-menu";

export default function NavbarDashboardMenuButton({userData}:{userData:NavbarProfileProps}) {
  const [isMenuOpen, setIsMenuOpen] =  useState(false)

  const handleOpenMenu = () => {
    document.body.style.overflow = "hidden"
    setIsMenuOpen(true)
  };

  return (
    <>
     <div 
        className="bg-[#282A2D] text-white py-1 px-3 rounded-[4px] lg:hidden"
        onClick={handleOpenMenu}
      >Menu</div>
      {isMenuOpen && <NavbarDashboardMenu onClose={() => {setIsMenuOpen(false)}} userData={userData}/>}
    </>
  )
}
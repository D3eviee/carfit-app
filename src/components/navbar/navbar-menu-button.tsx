'use client'
import { useState } from "react";
import NavbarMenu from "./navbar-menu";
import { NavbarProfileProps } from "@/lib/types";

export default function NavbarMenuButton({userData}:{userData:NavbarProfileProps}) {
  const [isMenuOpen, setIsMenuOpen] =  useState(false)

  const handleOpenMenu = () => {
    document.body.style.overflow = "hidden"
    setIsMenuOpen(true)
  };

  return (
    <>
     <div 
        className="bg-[#282A2D] text-white py-1 px-3 rounded-[4px] md:hidden"
        onClick={handleOpenMenu}
      >Menu</div>
      {isMenuOpen && <NavbarMenu onClose={() => {setIsMenuOpen(false)}} userData={userData}/>}
    </>
  )
}
'use client'
import { useState } from "react";
import NavbarMenu from "./navbar-menu";

export default function NavbarMenuButton() {
  const [isMenuOpen, setIsMenuOpen] =  useState(false)

  return (
    <>
     <div 
        className="bg-[#282A2D] text-white py-1 px-3 rounded-[4px] md:hidden"
        onClick={()=>setIsMenuOpen(true)}
      >Menu</div>
      {isMenuOpen && <NavbarMenu onClose={() => {setIsMenuOpen(false)}}/>}
    </>
  )
}
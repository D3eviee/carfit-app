'use client'
import Link from "next/link";
import NavbarProfileMenu from "./navbar-profile";
import { getNavbarUserData } from "@/actions/actions";
import { useState } from "react";
import NavbarMenu from "./navbar-menu";

export default function Navbar() {
  //checking what type of user is loged id 
  //const user = await getNavbarUserData()

  const [isMenuOpen, setIsMenuOpen] =  useState(false)
  const user = false

  return (
    <nav className="flex flex-row justify-between items-center px-5 py-5">
      <Link href="/"><h3 className="font-semibold text-2xl md:text-2xl">CarFit</h3></Link>
    
      {/* MENU TOGGLE FOR MOBILE */}
      <div 
        className="bg-[#282A2D] text-white py-1 px-3 rounded-[4px] md:hidden"
        onClick={()=>setIsMenuOpen(true)}
      >Menu</div>
      {isMenuOpen && <NavbarMenu onClose={() => {setIsMenuOpen(false)}}/>}



      {user && user?.role != "UNKNOWN" ? (
        <div className="flex gap-4 justify-center items-center">
          <NavbarProfileMenu userData={user} />
        </div>
      ) 
      : (
        <div className="hidden md:flex md:gap-6">
          <Link href="/support">
            <button className="px-[15px] py-[9px] text-[#111] bg-gray-100 font-semibold rounded-[5px] text-sm hover:bg-gray-200">Wsparcie</button>
          </Link>

          <Link href="/business">
            <button className="px-[15px] py-[9px] text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Dla biznesu</button>
          </Link>
          <Link href="/sign-in">
            <button className="px-[15px] py-[9px] text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Zaloguj</button>
          </Link>
        </div>
        )}
    </nav>
  )
}


    // <nav className="relative flex flex-row justify-between items-center px-20 pt-11">
    //   <Link href="/">
    //     <h3 className="font-semibold text-2xl/7">CarFit</h3>
    //   </Link>
    

    //   {user && user?.role != "UNKNOWN" ? (
    //     <div className="flex gap-4 justify-center items-center">
    //       <NavbarProfileMenu userData={user} />
    //     </div>
    //   ) 
    //   : (
    //     <div className="flex gap-6">
    //       <Link href="/support">
    //         <button className="px-[15px] py-[9px] text-[#111] bg-gray-100 font-semibold rounded-[5px] text-sm hover:bg-gray-200">Wsparcie</button>
    //       </Link>

    //       <Link href="/business">
    //         <button className="px-[15px] py-[9px] text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Dla biznesu</button>
    //       </Link>
    //       <Link href="/sign-in">
    //         <button className="px-[15px] py-[9px] text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Zaloguj</button>
    //       </Link>
    //     </div>
    //     )}
    // </nav>
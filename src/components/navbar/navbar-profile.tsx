'use client'
import Image from "next/image";
import profile_picture from '../../../public/default_user_image.png';
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import NavbarProfileDropdown from "./navbar-profile-dropdown";
import { NavbarProfileProps } from "@/lib/types";

// the purpose of this component is to dispaly small profile header in navigation bar
// when client is loged in

export default function NavbarProfile({userData}:{userData:NavbarProfileProps}) {
  if(!userData) return null

  // menu profile modal state
  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <div
      className="relative py-1 px-2 flex gap-2 items-center rounded-lg hover:cursor-pointer hover:bg-[#F0EEEF]" 
      onClick={() => setIsOpen(true)}
    >
      <Image 
        src={userData.image || profile_picture} 
        alt="profile image" 
        width={35} height={35} 
        className="w-9 h-9 rounded-full shadow-[0px_0px_3px_1px_#00000030]" 
      />

      {/* text and state arrow */}
      <div className="flex flex-row gap-0.5 items-center">
        <p className="text-xs font-normal color-[#151C24]">{userData.name}</p>
        {!isOpen ? <ChevronDown  className="mt-[1px]" color="#151C24" size={20} strokeWidth={1}/>
          : <ChevronUp  className="mt-[1px]" color="#151C24" size={20} strokeWidth={1}/>}
      </div>
      
      {/* modal for profile  header  */}
      <NavbarProfileDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} userData={userData}/>
    </div>
  )
}
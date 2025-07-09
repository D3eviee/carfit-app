'use client'
import Image from "next/image";
import profile_picture from '../../../public/default_user_image.png';
import { Book, Headset, User } from "lucide-react";
import { NavbarProfileDropdownOption } from "./navbar-profile-dropdown-option";
import { NavbarProfileProps } from "@/lib/types";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { NavbarProfileDropdownLogout } from "./navbar-profile-dropdown-logout";

// this component provides dropdown menu. with options for logged in client

type NavbarProfileDropdownProps = {
  userData: NavbarProfileProps
  isOpen: boolean
  onClose: () => void
}

export default function NavbarProfileDropdown({userData, isOpen, onClose}:NavbarProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle ESC and click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) onClose()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);


  if (!isOpen) return null
  const {name, phone, image} = userData

  return (
    createPortal(
      <div
        data-dropdown 
        className="absolute px-2.5 py-3 min-w-[200px] max-w-[250px] top-[68px] right-4 flex flex-col gap-2 bg-[#FFF] shadow-[0px_0px_3px_1px_#EEE] rounded-2xl xl:right-52"
        ref={dropdownRef}
      >
        {/* profile data */}
        <div className="flex flex-row items-center gap-1.5 px-1.5 py-1 bg-[#F9FAFC] rounded-xl border-[0.5px]">
         <Image src={image || profile_picture} width={35} height={35} alt="profile_pic"  className="w-9 h-9 rounded-full shadow-[0px_0px_3px_1px_#00000030]"/>
          <div className="w-full flex flex-col gap-[1px]">
            <p className="text-xs font-medium text-[#232832]">{name} </p>
            {phone && <p className="text-xs text-[#232832] font-light tracking-wide">{phone}</p>} 
          </div>      
        </div>

        {/* nav options */}
        <div className="flex flex-col gap-1.5">
            <NavbarProfileDropdownOption title="Wizyty" icon={<Book color="#555" strokeWidth="1.5px" size={16}/>} link="/user/appointments"/>
            <hr className="bg-[#E8E8E8]  h-[1px]"/>
          

          <div className="flex flex-col gap-1">
            <NavbarProfileDropdownOption title="Profil" icon={<User color="#555" strokeWidth="1.5px" size={16}/>} link="/user/profile"/>
            <NavbarProfileDropdownOption title="Pomoc" icon={<Headset color="#555" strokeWidth="1.5px" size={16}/>} link="/support"/>
          </div>

          <hr className="bg-[#E8E8E8] h-[1px]"/>

          <NavbarProfileDropdownLogout/>
          
        </div>
      </div>
      , document.body)
  )
}
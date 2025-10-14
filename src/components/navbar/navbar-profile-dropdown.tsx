'use client'
import Image from "next/image";
import profile_picture from '../../../public/default_user_image.png';
import { Book, Headset, User } from "lucide-react";
import { NavbarProfileDropdownOption } from "./navbar-profile-dropdown-option";
import { NavbarProfileProps } from "@/lib/types";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { NavbarProfileDropdownLogoutButton } from "./navbar-profile-dropdown-logout-button";

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

  const {name, phone, image} = userData

  if (!isOpen) return null
  return (
    createPortal(
      <div
        data-dropdown 
        className="absolute px-2.5 py-3 min-w-[200px] max-w-[210px] top-[75px] right-4 flex flex-col gap-2 bg-[#FFF] shadow-[0px_0px_3px_1px_#EEE] rounded-2xl xl:right-22 2xl:right-38"
        ref={dropdownRef}
      >
        {/* profile data */}
        <div className="w-full flex flex-row items-center gap-1.5 px-2 py-1.5 bg-[#F2F2F7] rounded-xl">
          <div className="relative w-9 h-9 overflow-clip rounded-full  shadow-[0px_0px_3px_1px_#00000030]">
            <Image 
              src={image || profile_picture} 
              fill 
              alt="profile pic"  
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-medium text-[#191919]">{name}</p>
            <p className="text-xs text-[#191919] font-light tracking-wide">{phone}</p>
          </div>      
        </div>

        {/* nav routes */}
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col gap-1">
            <NavbarProfileDropdownOption title="Profil" icon={<User color="#8A8A8A" strokeWidth="1.5px" size={16}/>} link="/user/profile" close={() => onClose}/>
            <NavbarProfileDropdownOption title="Wizyty" icon={<Book color="#8A8A8A" strokeWidth="1.5px" size={16}/>} link="/user/appointments" close={() => onClose}/>
            <NavbarProfileDropdownOption title="Ogłoszenia" icon={<Book color="#8A8A8A" strokeWidth="1.5px" size={16}/>} link="/user/announcements" close={() => onClose}/>
          </div>

          <hr className="text-[#F2F2F7]"/>
          <NavbarProfileDropdownOption title="Pomoc" icon={<Headset color="#8A8A8A" strokeWidth="1.5px" size={16}/>} link="/support" close={() => onClose}/>

          <NavbarProfileDropdownLogoutButton/>
        </div>
      </div>
      , document.body)
  )
}
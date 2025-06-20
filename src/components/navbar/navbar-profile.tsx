'use client'
import Image from "next/image";
import profile_picture from '../../../public/default_user_image.png';
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import NavbarProfileDropdown from "./navbar-profile-dropdown";
import { NavbarProfileProps } from "@/lib/types";

//component for rendering logged user iformation in navigation
export default function NavbarProfile({userData}:{userData:NavbarProfileProps}) {
  // state for managin dropdown menu
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className="hidden md:block">
      <div 
        className="flex items-center justify-center box-border p-[5px] rounded-[7px] hover:cursor-pointer hover:bg-[#E8E8E8]" 
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {!userData.image ?
         <Image src={profile_picture.src} width={35} height={35} alt="profile_pic"  className=" w-9 h-9 rounded-[50%] mr-4 shadow-[0px_0px_3px_1px_#00000030]" />
         :
         <Image src={userData.image} width={35} height={35} alt="profile_pic"  className=" w-9 h-9 rounded-[50%] mr-4 shadow-[0px_0px_3px_1px_#00000030]" />
        }
        
        <p className="p-0 m-0 mr-[3px] text-sm font-normal color-[#333333]">{userData.name}</p>
        <ChevronDown  className="mt-[1px]" color="#333333" size={20} strokeWidth={2}/>
      </div>
      
      {openMenu ? 
        <>
        <div 
          className="absolute w-screen h-screen left-0 top-0" 
          onClick={() => setOpenMenu((prev) => !prev)}
        />
          <NavbarProfileDropdown name={userData.name} phone={userData.phone} image={userData.image} role={userData.role}/>
        </>
      : <></>}
    </div>
  );
}


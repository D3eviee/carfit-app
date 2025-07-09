"use client"
import Image from "next/image";
import profile_picture from '@/../public/default_user_image.png'
import { LogOut } from "lucide-react";
import { NavbarProfileProps } from "@/lib/types";
import { logout } from "@/lib/auth";
import Link from "next/link";

type NavbarDashboardMobileMenuProfileProps = {
  closeMenuFn: () => void
  userData:NavbarProfileProps
}

export default function NavbarDashboardMobileMenuProfile({userData, closeMenuFn}:NavbarDashboardMobileMenuProfileProps){
  return (
    <Link href="/dashboard/profile" onClick={closeMenuFn}>
      <div className="relative flex flex-row justify-between items-center py-3 px-2  border bg-[#F2F4F8] rounded-[7px]">
        <div className="flex items-center box-border p-[5px]">
          <Image src={profile_picture.src} width={50} height={50} alt="profile_pic"  className=" w-12 h-12 rounded-[50%] mr-4 shadow-[0px_0px_3px_1px_#00000030]" />
          <p className="p-0 m-0 text-sm font-normal color-[#333333]">{userData.name}</p>
        </div>

        <div 
          className="h-fit w-fit p-2 flex justify-center items-center bg-[#CF142B] rounded-[5px] hover:cursor-pointer hover:bg-[#BE031A]"
          onClick={() => {logout()}}
        >
          <LogOut strokeWidth={2} size={22}  color="white"/>
        </div>
      </div>
    </Link>
  );
}


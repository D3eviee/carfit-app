"use client"
import { LogoutModal } from "@/components/modals/LogoutModal";
import { useModalStore } from "@/lib/store";
import { LogOut } from "lucide-react";

export default function DashboardMobileNavbarMenuLogoutButton(){
  const openModal = useModalStore(store => store.openModal)
  const handleUserLogout = () => openModal(<LogoutModal/>)
  
  return (
    <div 
      className="w-full flex flex-row justify-center items-center gap-2 py-2.5 bg-[#FF383C] rounded-xl hover:cursor-pointer hover:bg-[#EE272B]"
      onClick={handleUserLogout}
    >
      <p className="text-white">Wyloguj</p>
      <LogOut strokeWidth={2} size={22}  color="white"/>
    </div>
  )
}


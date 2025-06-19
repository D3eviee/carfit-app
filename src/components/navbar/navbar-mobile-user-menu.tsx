'use client'
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";

type NavbarMobileUserMenuProps = {
    closeMainMenu: () => void
    closeProfileMenu: () => void
}

export default function NavbarMobileUserMenu({closeMainMenu, closeProfileMenu}:NavbarMobileUserMenuProps) {
    return (
        <div className="absolute top-0 left-0 h-screen w-screen bg-white z-20 p-3">
            <div className="relative h-full flex flex-col gap-10">
                <div className="w-full flex justify-between">
                    <ChevronLeft size={30} color="#000" strokeWidth={1} onClick={closeProfileMenu} />    
                    <X size={30} color="#000" strokeWidth={1} onClick={closeMainMenu}/>    
                </div>

                <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-5">
                        <Link href="/user/profile" className="p-3 py-5 rounded active:bg-slate-100" onClick={closeMainMenu}>
                            <div className="flex flex-row justify-between">
                                <p className="text-md font-semibold">Profil</p>
                                <ChevronRight strokeWidth={1.5}/>
                            </div>
                        </Link>

                        <Link href="/user/appointments" className="p-3 py-5 rounded active:bg-slate-100" onClick={closeMainMenu}>
                            <div className="flex flex-row justify-between">
                                <p className="text-md font-semibold">Wizyty</p>
                                <ChevronRight strokeWidth={1.5}/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div> 
        </div>
    )
}
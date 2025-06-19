'use client'
import { ChevronRight, X } from "lucide-react";
import Link from "next/link";
import NavbarMobileMenuProfile from "./navbar-dashboard-mobile-menu-profile";
import { NavbarProfileProps } from "@/lib/types";

export default function NavbarMenu({onClose, userData}:{onClose: () => void, userData:NavbarProfileProps}) {
    //bocking scroll while menu is open
    const handleClose = () => {
        document.body.style.overflow = ""
        onClose()
    }

    return (
        <div className="absolute top-0 left-0 h-svh w-full bg-white z-10 p-3">
            <div className="relative h-full flex flex-col gap-10">
                <div className="w-full flex justify-end">
                    <X size={30} color="#000" onClick={handleClose} strokeWidth={1} className="align-right"/>    
                </div>

                <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-5">
                        <Link href="/business" className="p-3 py-5 rounded active:bg-slate-100" onClick={handleClose}>
                            <div className="flex flex-row justify-between">
                                <p className="text-md font-semibold">Dla biznesu</p>
                                <ChevronRight strokeWidth={1.5}/>
                            </div>
                        </Link>

                        <Link href="/support" className="p-3 py-5 rounded active:bg-slate-100" onClick={handleClose}>
                            <div className="flex flex-row justify-between">
                                <p className="text-md font-semibold">Wsparcie</p>
                                <ChevronRight strokeWidth={1.5}/>
                            </div>
                        </Link>

                        <Link href="/sign-in" className="p-3 py-5 rounded active:bg-slate-100" onClick={handleClose}>
                            <div className="flex flex-row justify-between">
                                <p className="text-md font-semibold">Zaloguj</p>
                                <ChevronRight strokeWidth={1.5}/>
                            </div>
                        </Link>
                    </div>

                    {userData && <NavbarMobileMenuProfile closeMenuFn={handleClose} userData={userData}/>}
                </div>
            </div> 
        </div>
    )
}
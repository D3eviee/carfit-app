'use client'
import { ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils";

// this component provides mobile menu for business page

type NavbarMobileMenuProps = {
    isOpen: boolean
    onClose: () => void
}

export default function BusinessNavbarMobileMenu({isOpen, onClose}:NavbarMobileMenuProps) {
    //bocking scroll while menu is open
    const handleClose = () => {
        document.body.style.overflow = ""
        onClose()
    }

    return ( 
        <div 
            className={cn( "absolute top-0 left-0 h-screen w-full bg-white p-4 z-50 transition-all duration-300 ease-in-out", 
            isOpen ? "opacity-100 translate-y-0 pointer-events-auto": "opacity-0 -translate-y-full pointer-events-none")}
        >
            <div className="relative h-full flex flex-col gap-10">
                {/* Closing bar */}
                <div className="w-full flex justify-end">
                    <X size={25} color="#151C24" onClick={handleClose} strokeWidth={1} className="align-right"/>    
                </div>

                <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="px-3 py-5 rounded-md hover:bg-[#F9FAFC]" onClick={onClose}>
                            <div className="flex flex-row justify-between">
                                <p className="text-md text-[#151C24] font-medium">Home</p>
                                <ChevronRight strokeWidth={1.5} color="#151C24"/>
                            </div>
                        </Link>

                        <Link href="/user/support" className="px-3 py-5 rounded-md hover:bg-[#F9FAFC]" onClick={onClose}>
                            <div className="flex flex-row justify-between">
                                <p className="text-md text-[#151C24] font-medium">Wsparcie</p>
                                <ChevronRight strokeWidth={1.5} color="#151C24"/>
                            </div>
                        </Link>

                        <Link href="/business/sign-in" className="px-3 py-5 rounded-md hover:bg-[#F9FAFC]" onClick={onClose}>
                            <div className="flex flex-row justify-between">
                                <p className="text-md text-[#151C24] font-medium">Zaloguj</p>
                                <ChevronRight strokeWidth={1.5} color="#151C24"/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div> 
        </div>
    )
}
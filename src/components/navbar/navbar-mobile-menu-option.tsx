'use client'
import { ChevronRight} from "lucide-react";
import Link from "next/link";

// this component provides option for mobile menu

type NavbarMobileMenuOptionProps = {
    path: string
    label: string
    onClose: () => void
}

export default function NavbarMobileMenuOption({label, path, onClose}:NavbarMobileMenuOptionProps) {
    return ( 
        <Link href={path} className="px-3 py-5 rounded-md hover:bg-[#F9FAFC]" onClick={onClose}>
            <div className="flex flex-row justify-between">
                <p className="text-md text-[#151C24] font-medium">{label}</p>
                <ChevronRight strokeWidth={1.5} color="#151C24"/>
            </div>
        </Link>
    )
}
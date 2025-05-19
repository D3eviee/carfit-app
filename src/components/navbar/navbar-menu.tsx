'use client'
import { ChevronRight, X } from "lucide-react";
import Link from "next/link";

export default function NavbarMenu({onClose}:{onClose: () => void}) {
    return (
        <div className="absolute top-0 left-0 min-h-svh min-w-full bg-white z-10 p-3">
            <div className="flex flex-col gap-10">
                <div className="w-full flex justify-end">
                    <X size={30} color="#000" onClick={() => onClose()} strokeWidth={1} className="align-right"/>    
                </div>
            
                <div className="flex flex-col gap-5">
                    <Link href="/business" className="p-3 py-5 rounded active:bg-slate-100">
                        <div className="flex flex-row justify-between">
                            <p className="text-md font-semibold">Dla biznesu</p>
                            <ChevronRight strokeWidth={1.5}/>
                        </div>
                    </Link>

                    <Link href="/support" className="p-3 py-5 rounded active:bg-slate-100">
                        <div className="flex flex-row justify-between">
                            <p className="text-md font-semibold">Wsparcie</p>
                            <ChevronRight strokeWidth={1.5}/>
                        </div>
                    </Link>

                    <Link href="/sign-in" className="p-3 py-5 rounded active:bg-slate-100">
                        <div className="flex flex-row justify-between">
                            <p className="text-md font-semibold">Zaloguj</p>
                            <ChevronRight strokeWidth={1.5}/>
                        </div>
                    </Link>
                </div>
            </div> 
        </div>
    )
}
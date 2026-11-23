import Link from "next/link"
import { cn } from "@/utils"

export const BusinessJoinButton = ({ className }: { className?: string }) => {
    return (
        <Link
            href="/business/sign-in"
        className={cn("block w-fit px-8 py-3 rounded-2xl mx-auto bg-[#0271E3] text-white shadow-xl hover:bg-[#1382F2]", className )}>
            Dołącz za darmo
        </Link >
    )
}
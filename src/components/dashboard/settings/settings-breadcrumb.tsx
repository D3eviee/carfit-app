import Link from 'next/link'
import { ArrowLeft } from "lucide-react"

type SettingsBreadcrumbProps = {
    parentPage: string
    thisPage: string
}

export default function SettingsBreadcrumb({parentPage, thisPage}:SettingsBreadcrumbProps){
    return (
        <div className="flex flex-row items-center gap-2">
            {/* BACK BUTTON */}
            <Link href="/dashboard/settings">
                <ArrowLeft size={25} strokeWidth={2}  className="box-content p-1 text-[#333] hover:cursor-pointer hover:text-[#111]"/>
            </Link>

            {/* BREADCRUMB */}
            <div className="flex flex-row items-center gap-1">
                <p className="text-[#333] text-sm font-light">{`${parentPage} |`}</p>
                <p className="text-[#111] text-sm font-light">{thisPage}</p>
            </div>
        </div>
    )
}
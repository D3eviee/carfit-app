import Link from "next/link";
import { GoHome } from "react-icons/go";

type SettingGridItemProps = {
  title:string 
  description:string 
  route:string
}

export function SettingGridItem({title, description, route}:SettingGridItemProps){
  return(
    <Link href={`${route}`}>
      <div 
        className="w-full flex flex-row items-center h-24 bg-[#FFF] border-[0.5px] border-[#D4D4D4] shadow-sm p-4 rounded-3xl hover:cursor-pointer hover:bg-[#F2F2F2] active:scale-xs"
      >
        {/* ICON */}
        <div className="w-1/7">
          <GoHome size={35} strokeWidth={0.001} color="#2B2B2B"/>
        </div>
        {/* TEXTS */}
        <div className="flex flex-col gap-0.5 px-3 w-full">
          <p className="text-main-black font-medium tracking-tight">{title}</p>
          <p className="text-main-black font-normal text-small leading-4.5 text-pretty">{description}</p>
        </div>
      </div>
    </Link>
  )
}
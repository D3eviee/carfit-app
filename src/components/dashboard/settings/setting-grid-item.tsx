import Link from "next/link";
import { GoHome } from "react-icons/go";

export function SettingGridItem({title, description, redirect}:{title:string, description:string, redirect:string}){
  return(
    <Link href={`settings/${redirect}`}>
      <div 
        className="w-full h-24 flex items-center flex-row bg-[#F5F5F5] p-4 inset-2 rounded-xl shadow-[0px_0px_2px_3px_#233038] ring-4 ring-[#F9F9F9] border
        hover:bg-[#FAFAFA] hover:border-[#F2F2F2] hover:cursor-pointer"
      >
        {/* ICON */}
        <div className="w-1/7">
          <GoHome size={35} strokeWidth={0.5} color="#111"/>
        </div>
        {/* TEXTS */}
        <div className="flex flex-col gap-1 px-3 w-full">
          <h3 className="text-base text-medium text-[#111] font-normal">{title}</h3>
          <p className="text-[13px] leading-5 text-medium text-[#333] font-light">{description}</p>
        </div>
      </div>
    </Link>
  )
}
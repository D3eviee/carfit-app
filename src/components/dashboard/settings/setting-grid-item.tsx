import Link from "next/link";
import { GoHome } from "react-icons/go";

export function SettingGridItem({title, description, redirect}:{title:string, description:string, redirect:string}){
  return(
    <Link href={`settings/${redirect}`}>
    <div className="bg-[#FDFDFD] h-[144px] w-[307px] px-[30px] py-[15px] border-[1.25px] rounded-[10px] flex gap-[15px] hover:bg-[#FAFAFA] hover:border-[#F2F2F2] hover:cursor-pointer">
      <GoHome className="-mt-[20px]" size={70} color="#F25287"/>
      <div className="settings-page-grid-item-description">
        <h3 className="p-0 m-0 text-medium text-[#000] mb-[8px]">{title}</h3>
        <p className="p-0 m-0 text-xs text-[#111] font-light">{description}</p>
      </div>
    </div>
    </Link>
  )
}
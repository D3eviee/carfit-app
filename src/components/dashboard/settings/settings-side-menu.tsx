'use client'
import { cn } from "@/utils";
type SettingsBusinessMenuProps = {
  openView?: string
  changeViewFn?: (link:string) => void 
  pages: {
    title: string
    view: string
  }[]
}

export default function SettingsSideMenu({openView, changeViewFn, pages}:SettingsBusinessMenuProps) {
  
  return (
    <div className="w-full bg-white rounded-md shadow-[0px_0px_2px_3px_#233038] ring-4 ring-[#F9F9F9] md:h-fit md:max-w-[200px]">
      <div className="flex flex-row md:flex-col md:gap-3 md:p-2">
        {pages.map((page, index) => (
          <p 
            key={index}
            className={cn("text-center w-full px-2 py-2 text-sm font-light text-[#555555] rounded-md  hover:cursor-pointer lg:text-left",  
            openView == page.view ? "bg-[#111] text-white font-medium" : "hover:bg-[#F2F4F8]")}
            onClick={() => changeViewFn(page.view)}
          >
            {page.title}
          </p>
        ))}
      </div>
    </div>
  )
}
import Link from "next/link";


export function NavbarProfileDropdownOption({title, icon, link, close}:{title:string, icon:React.ReactNode, link:string, close: () => void}) {
    return (
      <Link 
        href={link}
        onClick={close} 
        className="decoration-none"
      
      >
        <div 
          className="flex flex-row gap-2 items-center px-2 py-1.5 rounded-md border-[0.5px] border-transparent hover:bg-[#F9FAFC] hover:border-[#DADDE1] hover:cursor-pointer"
        >
          {icon}
          <p className="text-xs text-[#8A8A8A] font-base">{title}</p>
        </div>
      </Link>
    );
}

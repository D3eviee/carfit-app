import Link from "next/link";
import BusinessNavbarMobileMenuButton from "./business-navbar-mobile-menu-button";

export default function BusinessNavbar() {
  return (
    <header className="flex flex-row items-center justify-between px-4 xl:px-52 py-5">
      {/* Logo */}
      <Link href="/"><h3 className="font-semibold text-2xl md:text-2xl">CarFit</h3></Link>
    
      {/* navigation */}
      <>
        {/* mobile navigation */}
        <BusinessNavbarMobileMenuButton/>
      
        {/* desktop navigation */}
          <nav className="hidden md:flex flex-row gap-5 ">
                <Link href="/">
                  <div className="py-1 px-4 text-[#151C24] bg-[#F0EEEF] font-medium rounded-[5px] text-sm hover:bg-[#E4E4E4]">Home</div>
                </Link>

                <Link href="/user/support">
                  <div className="py-1 px-4 bg-[#151C24] text-[#FFF] text-sm font-medium rounded-[5px] hover:cursor-pointer hover:bg-[#262D35]">Wsparcie</div>
                </Link>

                <Link href="/business/sign-in">
                  <div className="py-1 px-4 bg-[#151C24] text-[#FFF] text-sm font-medium rounded-[5px] hover:cursor-pointer hover:bg-[#262D35]">Zaloguj</div>
                </Link>        
        </nav>
      </>
    </header>
  )
}
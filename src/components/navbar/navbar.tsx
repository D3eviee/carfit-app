import Link from "next/link";
import NavbarProfileMenu from "./navbar-profile";
import { getNavbarUserData } from "@/actions/actions";
import NavbarMobileMenuButton from "./navbar-mobile-menu-button";

export default async function Navbar() {
  // checking what type of user is logged-in
  const user = await getNavbarUserData()

  return (
    <header className="flex flex-row items-center justify-between py-5 px-4 xl:px-20 2xl:px-36">
      {/* Logo */}
      <Link href="/"><h3 className="font-semibold text-2xl md:text-2xl">CarFit</h3></Link>
    
      {/* navigation */}
      <>
        {/* mobile navigation */}
        <NavbarMobileMenuButton userData={user}/>
      
        {/* desktop navigation */}
        <nav className="hidden md:flex flex-row gap-10 items-center">
          {/* menu options */}
          <div className="flex flex-row gap-5">
            
            {user.role == "NONAUTHORIZED" && (
              <>
                <Link href="/support">
                  <div className="py-1 px-4 text-[#000] bg-[#F2F2F2] border font-medium rounded-[5px] text-sm hover:bg-[#F7F7F7]">Wsparcie</div>
                </Link>

                <Link href="/business">
                  <div className="py-1 px-4 bg-[#151C24] text-[#FFF] border border-transparent text-sm font-medium rounded-[5px] hover:cursor-pointer hover:bg-[#262D35]">Dla biznesu</div>
                </Link>

                <Link href="/sign-in">
                  <div className="py-1 px-4 bg-[#151C24] text-[#FFF] border border-transparent  text-sm font-medium rounded-[5px] hover:cursor-pointer hover:bg-[#262D35]">Zaloguj</div>
                </Link>
              </>)
            }

            {user.role == "BUSINESS" && (
              <>
                <Link href="/support">
                  <div className="py-1 px-4 text-[#151C24] bg-[#F0EEEF] font-medium rounded-[5px] text-sm hover:bg-[#E4E4E4]">Wsparcie</div>
                </Link>

                <Link href="/dashboard">
                  <div className="py-1 px-4 bg-[#151C24] text-[#FFF] text-sm font-medium rounded-[5px] hover:cursor-pointer hover:bg-[#262D35]">Dashboard</div>
                </Link>
              </>)
            }

            {/* profile indicator */}
            {(user && user.role == "CLIENT") && <NavbarProfileMenu userData={user} />}
          </div> 
        </nav>
      </>
    </header>
  )
}
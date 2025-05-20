import Link from "next/link";
import NavbarProfileMenu from "./navbar-profile";
import { getNavbarUserData } from "@/actions/actions";
import NavbarMenuButton from "./navbar-menu-button";

export default async function Navbar() {
  //checking what type of user is loged id 
  const user = await getNavbarUserData()

  return (
    <nav className="flex flex-row justify-between items-center px-5 py-5">
      <Link href="/"><h3 className="font-semibold text-2xl md:text-2xl">CarFit</h3></Link>
    
      {/* MENU TOGGLE FOR MOBILE */}
     <NavbarMenuButton/>

      {user && user?.role != "UNKNOWN" ? (
        <div className="flex gap-4 justify-center items-center">
          <NavbarProfileMenu userData={user} />
        </div>
      ) 
      : (
        <div className="hidden md:flex md:gap-6">
          <Link href="/support">
            <button className="px-[15px] py-[9px] text-[#111] bg-gray-100 font-semibold rounded-[5px] text-sm hover:bg-gray-200">Wsparcie</button>
          </Link>

          <Link href="/business">
            <button className="px-[15px] py-[9px] text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Dla biznesu</button>
          </Link>
          <Link href="/sign-in">
            <button className="px-[15px] py-[9px] text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Zaloguj</button>
          </Link>
        </div>
        )}
    </nav>
  )
}
import Link from "next/link";
import NavbarProfileMenu from "./navbar-profile";
import { getNavbarUserData } from "@/actions/actions";
import NavbarMenuButton from "./navbar-menu-button";

export default async function Navbar() {
  //checking what type of user is loged id 
  const user = await getNavbarUserData()

  return (
    <nav className="flex flex-row justify-between  items-center px-5 py-5">
      <Link href="/"><h3 className="font-semibold text-2xl md:text-2xl">CarFit</h3></Link>
    
      {/* MENU TOGGLE FOR MOBILE */}
      <div>
      <NavbarMenuButton userData={user}/>
      
      <div className="flex flex-row gap-10 items-center">
        <div className="hidden md:flex md:gap-6">
          <Link href="/business">
            <button className="py-1 px-2 text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Dla biznesu</button>
          </Link>

          {!user && <Link href="/sign-in">
            <button className="py-1 px-2 text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Zaloguj</button>
          </Link>}

          <Link href="/support">
            <button className="py-1 px-2 text-[#111] bg-gray-100 font-semibold rounded-[5px] text-sm hover:bg-gray-200">Wsparcie</button>
          </Link>
        </div>

        {(user && user.role != "UNKNOWN") && <NavbarProfileMenu userData={user} />}
      </div>
      </div>
    </nav>
  )
}
import Link from "next/link";
import { getNavbarUserData } from "@/actions/actions";
import NavbarDashboardMenuButton from "./navbar-dashboard-menu-button";

export default async function NavbarDashboard(){
    const serviceNavigationData = await getNavbarUserData()
    return(
        <nav className="w-dvw flex flex-row justify-between items-center py-3 px-4 bg-white border shadow-[0px_2px_7px_0px_#ACACAC25] z-10">
            <Link href="/"><h3 className="font-semibold text-2xl/7">CarFit</h3></Link>
            <NavbarDashboardMenuButton userData={serviceNavigationData}/>
            {/* {serviceNavigationData && <NavbarProfileMenu userData={serviceNavigationData}/>} */}
        </nav> 
    )
}

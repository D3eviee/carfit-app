import { getSideNavigationProfileData } from "@/actions/actions"
import { useQuery } from "@tanstack/react-query"
import { Error } from "../../error"
import { Spinner } from "../../spinner"
import { useState } from "react"
import Image from "next/image"
import default_picture from "@/../public/ananymous_image.jpg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils"

export const SidebarNavigationProfile = () => {
  const path = usePathname()

  const [error, setError] = useState<string>()

  const {data, status} = useQuery({
    queryKey: ["getSidebarNavigationProfileData"],
    queryFn: async () => {
      const result = await getSideNavigationProfileData()
      if (!result.success) setError(result.message)
      return result.data
    }
  })

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error message={error}/>

  return (
      <Link href="/dashboard/profile">
        <div className={cn("w-full flex flex-row items-center px-2 py-1.5 gap-2 bg-[#F2F2F2] border rounded-md hover:cursor-pointer hover:bg-[#E1E1E1]", path == "/dashboard/profile" && "bg-white")}>
          <div className="relative w-12 h-9 rounded-full overflow-hidden">
            <Image 
              src={data.image ? data.image : default_picture} 
              alt='Profile image' 
              fill
              className="object-cover"
            />
          </div>
          <p className="w-full text-sm text-[#000] font-medium leading-none ">{data.owner}</p>
        </div>
      </Link>
  )
}


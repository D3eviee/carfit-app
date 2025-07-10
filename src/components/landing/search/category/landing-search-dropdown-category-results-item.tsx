import Image from "next/image";
import { createLinkFormat } from "@/lib/functions";
import Link from "next/link";
import default_image from '@/../public/default_user_image.png'

type LandingSearchCategoryDropdownNoResultItemProps = {
  businessData : {
    id: string
    name: string
    image: string
  }
  onClose: (businessName:string) => void
}

export default function LandingSearchDropdownCategoryResultItem({onClose, businessData}: LandingSearchCategoryDropdownNoResultItemProps){
  const {id, name, image} = businessData

  return (
    <Link 
      href={createLinkFormat(id, name)}  
      onClick={() => onClose(name)}
      className="flex flex-row items-center gap-3 p-2 hover:bg-[#ccc] rounded-md"
    >
      <div className="relative w-10 h-10 rounded-full overflow-clip">
        <Image src={image || default_image} alt="Service image" fill/>
      </div>
      <p className="text-sm text-[#333] font-medium">{name}</p>
  </Link>
  )
}
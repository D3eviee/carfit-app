import Image from "next/image";
import Link from "next/link";
import default_image from '@/../public/default_user_image.png'
import { createLinkFormat } from "@/utils";

type LandingSearchFormDropdownCategoryResultItemProps = {
  businessData : {
    id: string
    name: string
    image: string
  }
  onClose: (businessName:string) => void
}

export const LandingSearchFormDropdownCategoryResultItem = ({onClose, businessData}: LandingSearchFormDropdownCategoryResultItemProps) => {
  const {id, name, image} = businessData

  return (
    <Link 
      href={createLinkFormat(id, name)}  
      onClick={() => onClose(name)}
      className="flex flex-row items-center gap-3 p-2 hover:bg-[#F2F2F7] rounded-md"
    >
      <div className="relative w-10 h-10 rounded-full overflow-clip">
        <Image src={image || default_image} alt="Service image" fill/>
      </div>
      <p className="text-sm text-[#191919] font-medium">{name}</p>
  </Link>
  )
}
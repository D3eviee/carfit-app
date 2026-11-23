import Image from "next/image"
import Link from "next/link"
import carServiceImage from "@/../public/car_service.jpg"

export const BusinessForYouSectionItem = ({ categoryName }: { categoryName: string }) => {
  return (
    <Link 
      href={"/business/onboarding"}
      className="bg-white w-fit flex flex-row gap-4 items-center p-1 rounded-4xl ring-[0.5px] ring-[#D4D4D4] ring-offset-2 transition-all duration-150 ease-in hover:ring-[#D4D4D4] hover:ring-1 hover:scale-105"  
    >
      <div className="relative overflow-clip rounded-full w-12 h-12">
        <Image src={carServiceImage} alt="" fill sizes="48px" className="object-cover" />
      </div>
      <p className="text-main-black font-semibold tracking-wide pr-3">{categoryName}</p>
    </Link>
  )
}
import { SERVICES_CATEGORIES } from "@/lib/constants/search"
import { BusinessPageWeAreForuSectionItem } from "./business-foru-section-item"

export const BusinessPageWeAreForuSection = () => {
  return (
    <div className="bg-[#F5F5F7] px-2 py-16 flex flex-col gap-8 lg:py-25 md:px-12 xl:px-35 2xl:px-45 lg:flex-row lg:gap-5 lg:h-full items-center justify-between">
        <div className="w-full md:w-1/2 lg:w-2/3 ">
             <h1 className="text-main-black text-2xl font-bold tracking-tight lg:text-4xl text-center">CarFit dla twojego biznesu</h1>
        </div>
        <div className="w-full flex flex-row flex-wrap justify-center gap-y-4 gap-x-6  lg:justify-end">
          {SERVICES_CATEGORIES.map((item, index) => <BusinessPageWeAreForuSectionItem key={index} imageUrl={item.url} categoryName={item.name}/> )}
        </div>
    </div>
  )
}

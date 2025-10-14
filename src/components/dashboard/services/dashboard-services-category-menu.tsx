import { DashboardServicesCategoryMenuAddCategoryButton } from "@/components/dashboard/services/dashboard-services-category-menu-add-category-button";
import { DashboardServicesCategoryMenuItem } from "./dashboard-services-category-menu-item";
import { ServicesCategory } from "@/lib/types";

export const DashboardServicesCategoryMenu = ({categories}: {categories: ServicesCategory[]}) => {
  return (
    <div className="h-fit w-full flex flex-col gap-4 p-4 border-1 border-[#E6E6E6] rounded-3xl md:w-1/3 lg:w-[215px]">
      <div className="w-full flex flex-row justify-between items-center">
         <p className="text-main-black text-md font-medium lg:text-xl lg:font-normal px-0.5">Kategorie</p>
          <DashboardServicesCategoryMenuAddCategoryButton />
      </div>
     
      <div className="flex flex-col gap-2">
        {categories.length > 0 
          ? categories.map((category, index) =>  <DashboardServicesCategoryMenuItem key={index} category={category}/> ) 
          : <p className="text-sm text-[#8A8A8A] text-center leading-none py-5">Brak kategorii</p>
        }
      </div>
    </div>
  )
}
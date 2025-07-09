import { AddCategoryButton } from "@/components/dashboard/services/add-category-button";
import ServicesCategorySidebarItem from "./services-categories-sidebar-item";
import { ServicesCategory } from "@/lib/types";

export default function ServicesSidebar({categories}: {categories: ServicesCategory[]}) {
  return (
    // <div className="w-full flex flex-col bg-[#FFF] gap-4 p-4 border border-[#D4D4D4] rounded-lg  lg:gap-5 lg:px-4 lg:py-5">
    <div className="w-full flex flex-col bg-[#FFF] gap-4 p-4 border border-[#D4D4D4] rounded-lg md:w-1/3 lg:w-[215px]">
      <div className="w-full flex flex-row justify-between items-center">
         <h3 className="text-[#111] text-md font-medium lg:text-xl lg:font-normal px-0.5">Kategorie</h3>
          <AddCategoryButton />
      </div>
     
      <ul className="flex flex-col gap-2 min-h-7 list-none">
        {categories && categories?.length > 0 ? (
          categories.map((category, index) => {
            return (
              <ul className="flex flex-row w-full" key={index}>
                <ServicesCategorySidebarItem category={category}/>
              </ul>
            );
          })
        ) : (
          <li className="text-sm font-light text-[#555] text-center">Brak kategorii</li>
        )}
      </ul>
    </div>
  );
}
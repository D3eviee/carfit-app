'use client'
import {ServiceServicesListItem } from "@/components/service/service-services-list-item";
import { Category } from "@/lib/types";
import { cn } from "@/utils";
import { useState } from "react";

export const  ServiceServicesList = ({categoriesData}:{categoriesData: Category[]}) =>  {
  const [selectedCategory, setSelectedCategory] = useState<string>(categoriesData[0].id);

  return (
    <div className="w-full flex flex-row gap-2.5 md:p-[5px] md:mb-[15px]">
      <div className="w-full flex flex-col gap-8">
          {/*SERVICES*/}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl text-[#000000] font-medium md:text-3xl">Usługi</h1>
            <div className="flex flex-row gap-[13px] overflow-scroll rounded-[5px] pr-[5px] mb-[15px]">

              {categoriesData && categoriesData.length > 0 ? (
                categoriesData.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className={cn(
                        "flex-none text-[#13161B] text-[15px] font-medium rounded-[7px] px-[10px] py-[5px] border-[0.5px] border-[] bg-[#F2F4F8] hover:cursor-pointer",
                        selectedCategory == category.id ? "bg-[#111] text-[#F2F4F8]" : ""
                      )}
                      onClick={() => {setSelectedCategory(category.id);}}
                    >
                      {category.name}
                    </div>
                  );
                })
              ) : (
                <p className="text-black">This business offers no services</p>
              )}
            </div>

            {categoriesData.map((category) => 
              category.services
                .filter(
                  (service) => service.categoryId == selectedCategory
                )
                .map((filteredService) => (
                  <ServiceServicesListItem key={filteredService.id} service={filteredService} />
                ))
            )}
          </div>
        </div>
      </div>
  )
}
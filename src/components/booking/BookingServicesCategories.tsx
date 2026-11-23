'use client'
import { Category } from "@/lib/types"
import { cn } from "@/utils"
import { useEffect, useRef, useState } from "react"
import { BookingServicesCategoryItem } from "./BookingServicesCategoryItem"

type BookingServicesCategoriesProps = {
  categoriesData: Category[]
  defaultSelectedCategory: string
}

export const BookingServicesCategories = ({ categoriesData, defaultSelectedCategory }: BookingServicesCategoriesProps ) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultSelectedCategory)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Move the indicator under the selected category
  useEffect(() => {
    const selectedElement = document.getElementById(`category-${selectedCategory}`)
    const indicator = indicatorRef.current
    if (!selectedElement || !indicator) return

    indicator.style.transform = `translateX(${selectedElement.offsetLeft}px)`
    indicator.style.width = `${selectedElement.offsetWidth}px`
  }, [selectedCategory])
  
  // Handles movement of the indicator and sets category
  const handleClick = (id: string, element: HTMLElement) => {
    setSelectedCategory(id)
    element.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" })
  }

  const services = categoriesData.find((c) => c.id === selectedCategory)?.services ?? []

  return (
    <div className="relative w-full h-full flex flex-col gap-3 overflow-hidden">
      {/* SELECT BAR */}
      <div className="relative w-full py-2 px-2 flex items-center gap-4 overflow-x-scroll scrollbar-none bg-[#FFF] border border-[#F2F2F8] shadow-inner rounded-2xl">
        {/* SELECTED CATEGORY INDICATOR */}
        <div
          ref={indicatorRef}
          className="absolute left-0 top-2 bottom-2 z-10 bg-linear-to-b from-[#313131] to-[#141414] rounded-xl transition-all duration-500 ease-in-out shadow-[0px_1px_0px_0.5px_#313131]"
        />

        {/* CATEGORIES */}
        {categoriesData.map((c) => (
          <button
            id={`c-${c.id}`}
            key={c.id}
            type="button"
            aria-pressed={selectedCategory === c.id}
            onClick={(e) => handleClick(c.id, e.currentTarget)}
            className={cn(
              "relative z-20 bg-transparent px-2 py-1.5 whitespace-nowrap flex items-center justify-center text-[15px] font-medium text-[#191919] cursor-pointer transition-colors duration-300",
              selectedCategory == c.id && "text-[#FFF]"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* SERVICES FOR SELECTED CATEGORY*/}
      <div className="flex-1 w-full flex flex-col justify-start gap-3 px-0.5 overflow-y-scroll pb-4 scrollbar-none p-1">
         {services.map((service) => <BookingServicesCategoryItem key={service.id} service={service} />
      )}
      </div>
    </div>
  )
}
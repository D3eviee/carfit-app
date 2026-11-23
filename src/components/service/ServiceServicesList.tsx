"use client"
import { useRef, useState } from "react"
import { ServiceServicesListItem } from "@/components/service/ServiceServicesListItem"
import { Category } from "@/lib/types"
import { cn } from "@/utils"

export const ServiceServicesList = ({ categoriesData }: { categoriesData: Category[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categoriesData[0]?.id ?? "")
  const indicatorRef = useRef<HTMLDivElement>(null)

  const handleClick = (id: string, element: HTMLElement) => {
    setSelectedCategory(id)

    const indicator = indicatorRef.current
    if (indicator) {
      indicator.style.transform = `translateX(${element.offsetLeft - 7}px)`
      indicator.style.width = `${element.offsetWidth}px`
    }

    element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }

  const services = categoriesData.find((category) => category.id === selectedCategory)?.services ?? []

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl text-[#111] font-semibold">Usługi</h1>

      {categoriesData.length === 0 ? (
        <p className="text-[15px] text-[#8A8A8E]">Brak dostępnych usług</p>
      ) : (
        <>
          {/* SELECT BAR */}
          <div className="relative w-full py-2 px-2 flex items-center gap-4 overflow-x-scroll scrollbar-none bg-[#FFF] border border-[#F2F2F8] shadow-inner rounded-2xl">
            <div
              ref={indicatorRef}
              className="w-[64px] translate-x-[7px] absolute left-0 top-2 bottom-2 z-10 bg-linear-to-b from-[#313131] to-[#141414] rounded-xl transition-all duration-500 ease-in-out shadow-[0px_1px_0px_0.5px_#313131]"
            />

            {categoriesData.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selectedCategory === item.id}
                onClick={(e) => handleClick(item.id, e.currentTarget)}
                className={cn(
                  "relative z-10 bg-transparent px-2 py-1.5 whitespace-nowrap flex items-center justify-center text-[15px] font-medium text-[#191919] cursor-pointer transition-colors duration-300",
                  selectedCategory === item.id && "text-[#FFF]"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* SERVICES */}
          <div className="flex flex-col justify-center gap-2 px-0.5">
            {services.map((service) => (
              <ServiceServicesListItem key={service.id} service={service} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
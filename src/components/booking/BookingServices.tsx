"use client"
import { Category } from "@/lib/types";
import { BookingServicesCategories } from "./BookingServicesCategories";
import { useAppointmentStore } from "@/lib/store";

export const BookingServices = ({ categoriesData }: { categoriesData: Category[] }) => {
  const firstSelectedId = useAppointmentStore((store) => store.selectedServices[0])

  if (categoriesData.length === 0) {
    return (
      <div className="h-full w-full flex flex-col gap-5">
        <h1 className="text-[#191919] text-2xl leading-none font-semibold">Wybierz usługi</h1>
        <p className="text-sm font-light text-[#2B2B2B]">Ten warsztat nie ma jeszcze usług do rezerwacji.</p>
      </div>
    )
  }
  
  const defaultCategoryId =
  categoriesData.find((c) => c.services.some((s) => s.id === firstSelectedId))?.id ?? categoriesData[0].id


  return (
    <div className="h-full w-full flex flex-col gap-5">
      <h1 className="text-[#191919] text-2xl leading-none font-semibold">Wybierz usługi</h1>
      <BookingServicesCategories categoriesData={categoriesData} defaultSelectedCategory={defaultCategoryId} />
    </div>
  );
}  
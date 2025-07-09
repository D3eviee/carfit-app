import { Category } from "@/lib/types";
import { BookingServicesCategories } from "./booking-service-categories";

export default function BookingServices({categoriesData}:{categoriesData: Category[]}) {
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <h1 className="text-[#191919] text-2xl leading-none font-semibold">Wybierz usługi</h1>
      <BookingServicesCategories categoriesData={categoriesData}/>
    </div>
  );
}
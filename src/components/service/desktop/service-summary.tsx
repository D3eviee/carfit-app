import { ServiceSummaryBookButton } from "./service-sumarry-book-button";
import { ServicePageTitleDataProps } from "@/lib/types";
import { ServiceSumarryWorkingHours } from "../service-sumarry-working-hours";
import { ServiceMobileSocials } from "../mobile/service-mobile-socials";
import { ServiceIsOpenTag } from "../service-is-open-tag";
import { Phone } from "lucide-react";
import { ServiceSumarryRating } from "./service-summarry-rating";

export const ServiceSummary = ({serviceSummaryData}:{serviceSummaryData: ServicePageTitleDataProps}) => {
  const reviews = serviceSummaryData.reviews
  const workingHoursData = serviceSummaryData.workingDays

  const phone = `${serviceSummaryData.phone.slice(0,3)} ${serviceSummaryData.phone.slice(3,6)} ${serviceSummaryData.phone.slice(6,9)}`

  return (
    <div className="mt-11 hidden lg:block sticky top-3 max-h-[90vh] w-1/3 rounded-2xl">
      <div className="w-full flex flex-col gap-4 px-6 py-8 rounded-2xl border shadow-inner-glass xl:px-8 xl:py-12 xl:gap-6">
        <div className="flex w-full flex-col gap-2.5">
          <h2 className="text-xl xl:text-[28px] text-[#191919] font-bold leading-8">{serviceSummaryData.name}</h2>
          <p className="text-sm xl:text-base text-[#8A8A8E] font-normal">{serviceSummaryData.street}, {serviceSummaryData.district}, {serviceSummaryData.town}, {serviceSummaryData.zipcode}</p>
          <ServiceSumarryRating reviewsData={reviews}/>

          <div className="flex flex-row items-center gap-2">
            <Phone size={15} strokeWidth={2} color="#8A8A8E"/>
            <p className="text-sm xl:text-base text-[#8A8A8E] font-normal">{phone}</p>
          </div>
        </div>

        <ServiceSummaryBookButton/>
        <hr className="h-1 w-full bg-red"/>

        <div className="flex w-full flex-col gap-4">
          <ServiceIsOpenTag workingHoursData={workingHoursData}/>
          <ServiceSumarryWorkingHours workingHoursData={workingHoursData}/>
        </div>
        
        <ServiceMobileSocials/>
    </div>
  </div>
  )
}
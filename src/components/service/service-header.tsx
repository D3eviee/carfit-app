import { ServicePageTitleDataProps } from "@/lib/types"
import { getISODay } from "date-fns"
import { ServiceBreadcrumb } from "./service-breadcrumb"
import { ServiceHeaderRating } from "./service-header-rating"
import { ServiceHeaderRatingMobile } from "./service-header-rating-mobile"

export const ServiceHeader = ({data}:{data:ServicePageTitleDataProps} ) => {
    const reviews = data.reviews
    const days = data.workingDays

    // today working hours
    const todayDayOfWeek = getISODay(new Date())
    const todayServiceOpeningData = days[todayDayOfWeek-1]
    const todayServiceWorkingHours = ` ${todayServiceOpeningData.open} - ${todayServiceOpeningData.close}`

    return (
      <div className="flex flex-col gap-3 md:gap-6">
        <ServiceBreadcrumb name={data.name} category={data.category} district={data.district} town={data.town} />
        <h1 className="text-[#111] font-bold text-2xl md:text-4xl ">{data.name}</h1>

        {/* HEADER MAIN SERVICE INFORMATION  */}
        <div className="flex gap-5 flex-row items-center">
          {/*IS OPEN*/}
          {todayServiceOpeningData.isOpen ?
          <div className="flex gap-1 py-1 px-2 items-center bg-green-500 rounded-sm text-white text-sm font-medium">
            <p>Otwarte</p>
            <p>:</p>
            <p>{todayServiceWorkingHours}</p>
          </div>
            :
            <p className="text-sm font-normal text-red-600">Zamknięte</p>
          }

          {/* RATING */}
          <ServiceHeaderRating reviewsData={reviews} className="hidden md:flex"/>
          <ServiceHeaderRatingMobile reviewsData={reviews} className="md:hidden"/>

          <p className="w-fit bg-[#f2f2f2] py-1 px-2 font-normal text-sm text-[#333] rounded-md hidden md:block">{`${data.town}, ${data.district}, ${data.street}`}</p>
        </div>


        {/*LOCATION*/}
        <p className="w-fit bg-[#f2f2f2] py-1 px-2 font-normal text-sm text-[#333] rounded-sm md:hidden">{`${data.town}, ${data.district} , ${data.street} `}</p>
      </div>
    )
}
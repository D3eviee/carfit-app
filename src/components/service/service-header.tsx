import { ServicePageTitleDataProps } from "@/lib/types"
import { getISODay } from "date-fns"
import { Dot } from "lucide-react"
import { ServiceBreadcrumb } from "./service-breadcrumb"
import { ServiceHeaderRating } from "./service-header-rating"

export const ServiceHeader = ({data}:{data:ServicePageTitleDataProps} ) => {
    const reviews = data.reviews
    const days = data.workingDays

    // today working hours
    const todayDayOfWeek = getISODay(new Date())
    const todayServiceOpeningData = days[todayDayOfWeek-1]
    const todayServiceWorkingHours = ` ${todayServiceOpeningData.open} - ${todayServiceOpeningData.close}`


    return (
      <div className="flex flex-col gap-1">
        <ServiceBreadcrumb name={data.name} category={data.category} district={data.district} town={data.town} />
        <h1 className="m-0 p-0 text-[40px] text-[#11111] font-bold">{data.name}</h1>

        {/* HEADER MAIN SERVICE INFORMATION  */}
        <div className="flex flex-row items-center">
          <ServiceHeaderRating reviewsData={reviews}/>
          <Dot/>
          {/*IS OPEN*/}
          {todayServiceOpeningData.isOpen ?
           <p className="text-[15px] font-normal text-[009600]">
            <span className="text-green-600">Otwarte</span>{todayServiceWorkingHours}</p>
            :
            <p className="text-[15px] font-normal text-red-600">Zamknięte</p>
          }
          <Dot/>
          {/*LOCATION*/}
          <p className="text-[15px] font-normal text-[111111]">{`${data.street}, ${data.district}, ${data.town} `}</p>
        </div>
        </div>
    )
}
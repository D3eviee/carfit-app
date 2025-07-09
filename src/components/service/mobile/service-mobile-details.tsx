import { WorkingDay } from "@/lib/types"
import { ServiceDescription } from "../service-description"
import { ServiceMobileSocials } from "./service-mobile-socials"
import { ServiceLocation } from "../service-location"
import { ServiceWorkingHours } from "../service-working-hours"

type ServiceMobileDetailsProps = {
  serviceDescription:string
  workingHoursData:WorkingDay[]
  locationData : {
    street: string,
    city: string
    zipcode: string 
  }
}

export const ServiceMobileDetails = ({serviceDescription, workingHoursData, locationData}:ServiceMobileDetailsProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl text-[#111] font-semibold">O nas</h1>
      <div className="w-full flex flex-col gap-8">
        <ServiceDescription serviceDescription={serviceDescription}/>
        <ServiceWorkingHours workingHoursData={workingHoursData}/>
        <ServiceMobileSocials/>
        <ServiceLocation locationData={locationData}/>
      </div>
    </div>
  )
}
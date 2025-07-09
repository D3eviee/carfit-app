import { WorkingDay } from "@/lib/types"
import { ServiceDescription } from "./service-description"
import { ServiceLocation } from "./service-location"

type ServiceDetailsProps = {
  serviceDescription:string
  workingHoursData:WorkingDay[]
  locationData : {
    street: string,
    city: string
    zipcode: string 
  }
}

export const ServiceDetails = ({serviceDescription, locationData}:ServiceDetailsProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl text-[#111] font-semibold">O nas</h1>
      <div className="w-full flex flex-col gap-8">
        <ServiceDescription serviceDescription={serviceDescription}/>
        <ServiceLocation locationData={locationData}/>
      </div>
    </div>
  )
}
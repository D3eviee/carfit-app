import { WorkingDay } from "@/lib/types"
import { ServiceDescription } from "../service-description"
import { ServiceMobileSocials } from "./ServiceMobileSocials"
import { ServiceLocation } from "../service-location"
import { ServiceWorkingHours } from "../ServiceWorkingHours"

type ServiceMobileDetailsProps = {
  serviceDescription:string
  workingHoursData:WorkingDay[]
  locationData : {
    street: string,
    city: string
    zipcode: string 
  }
  socials: {
    facebookUrl: string 
    instagramUrl: string 
    websiteUrl:string 
  }
}

export const ServiceMobileDetails = ({serviceDescription, workingHoursData, locationData, socials}:ServiceMobileDetailsProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl text-[#111] font-semibold">O nas</h1>
      <div className="w-full flex flex-col gap-8">
        <ServiceDescription serviceDescription={serviceDescription}/>
        <ServiceWorkingHours workingHoursData={workingHoursData}/>
        <ServiceMobileSocials facebookUrl={socials.facebookUrl} instagramUrl={socials.instagramUrl} websiteUrl={socials.websiteUrl}/>
        <ServiceLocation locationData={locationData}/>
      </div>
    </div>
  )
}
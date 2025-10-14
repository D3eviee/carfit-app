import { ServiceMobileView } from "@/components/service/mobile/service-mobile-view";
import { ServiceView } from "@/components/service/desktop/service-view";
import { Error } from "@/components/error";
import { getServiceData } from "../../actions";

export default async function Service({ params }: { params: Promise<{ business: string }> }){
  // getting business id from url
  const id = (await params).business.slice(-36)
  //getting business data
  const response = await getServiceData(id)
  if (!response.success) return <Error/>
  const businessData = response.data
  
  return (
    <>
      <div className="md:hidden">
        <ServiceMobileView businessData={businessData}/>
      </div>
      <div className="hidden md:block">
        <ServiceView businessData={businessData}/>
      </div>
    </>
   
  )  
}

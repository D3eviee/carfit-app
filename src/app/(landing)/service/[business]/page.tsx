import { getBusinessData} from "@/actions/actions";
import ServiceMobileView from "@/components/service/mobile/service-mobile-view";
import ServiceView from "@/components/service/desktop/service-view";

export default async function Service({ params }: { params: Promise<{ business: string }> }){
  // getting business id from url
  const { business } = await params
  const id = business.slice(-36)  

  //getting business data
  const response = await getBusinessData(id)
  if(!response.data) return <p>ERROR</p>

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

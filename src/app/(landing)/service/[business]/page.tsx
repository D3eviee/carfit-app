import { ServiceMobileView } from "@/components/service/mobile/ServiceMobileView";
import { ServiceView } from "@/components/service/desktop/ServiceView";
import { getServiceData } from "../../actions";
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type ServicePageProps = {
  params: Promise<{ business: string }>
}
// URL format: /service/<slug>-<uuid>
const getIdFromSlug = (slug: string) => slug.slice(-36)

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { business } = await params
  const data = await getServiceData(getIdFromSlug(business))
  if (!data) return { title: "CarFit | Nie znaleziono serwisu" }

  return {
    title: `CarFit | ${data.data.name}`,
    description: data.data.description?.slice(0, 160) || `${data.data.category} w ${data.data.town}. Sprawdź usługi, ceny, opinie i godziny otwarcia.`,
  }
}

export default async function SingleBusinessPage({ params }: ServicePageProps){
  // getting business id from url
  const { business } = await params
  const businessData = await getServiceData(getIdFromSlug(business))
  if (!businessData) notFound()
  
  return (
    <>
      <div className="md:hidden">
        <ServiceMobileView businessData={businessData.data}/>
      </div>
      <div className="hidden md:block">
        <ServiceView businessData={businessData.data}/>
      </div>
    </>
   
  )  
}
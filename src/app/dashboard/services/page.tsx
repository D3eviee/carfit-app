"use client";
import { DashboardServicesCategoryMenu } from "@/components/dashboard/services/dashboard-services-category-menu";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { DashboardServicesServiceMenu }  from "@/components/dashboard/services/dashboard-services-service-menu";
import { useBusienessServices } from "@/lib/hooks/useBusinessServices";

export default function ServicePage() {
  const { data:services, status }= useBusienessServices()
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>
  
  const categories = services && services.map((item) => ({id: item.id, name: item.name}))
  
  return (
    <div className="h-full w-full flex flex-col gap-5 overflow-hidden">
      <DashboardPageHeader
        title="Usługi" 
        subtitle="Dodawaj, zmieniaj i usuwaj dane o oferowanych przez Twój serwis usługach."
      />

      {/*SERVICES AND CATEGORIES SECTION*/}
      <div className="flex flex-col gap-4 md:flex-row h-full overflow-hidden">
        {/* MENU FOR CATEGORIES*/}
        <DashboardServicesCategoryMenu categories={categories!} />
        {/* MENU FOR SERVICEs*/}
        <DashboardServicesServiceMenu servicesData={services}/>
      </div>
    </div>
  )
}
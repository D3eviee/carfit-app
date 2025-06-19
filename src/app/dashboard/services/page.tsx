"use client";
import { AddServiceButton } from "@/components/dashboard/services/add-service-button";
import { useQuery } from "@tanstack/react-query";
import ServicesCategorySidebar from "@/components/dashboard/services/services-sidebar";
import ServicesServiceList from "@/components/dashboard/services/services-service-list";
import ServicesServiceListItem from "@/components/dashboard/services/services-service-list-item";
import { getServicesForBusiness } from "./actions";
import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";

export default function ServicePage() {
  const { data: servicesForBusinessData, status: servicesForBusinessStatus } = useQuery({
    queryKey: ["getServicesForBusiness"],
    queryFn: async () => {
      const response =  await getServicesForBusiness()
      if(!response.success) return null
      return response.data
    } 
  })
  
  const categories = servicesForBusinessData &&  servicesForBusinessData.map((item) => ({id: item.id, name: item.name}))

  if(servicesForBusinessStatus == "pending") return <p>PENDING</p>
  if(servicesForBusinessStatus == "error") return <p>ERROR</p>

  return (
      <div className="flex flex-col gap-5">
        {/*HEADINGS*/}
        <DashboardPageHeader
          title="Usługi"
          subtitle="Dodawaj, zmieniaj i usuwaj oferowane przez Twój serwis usługi."
        />

        {/*CONTENT*/}
        <div className="flex flex-col gap-4 md:flex-row">
          {/*LEFT MENU FOR CATEGORIES*/}
          <ServicesCategorySidebar categories={categories!} />

          {/*RIGHT PANEL WITH SERVICES*/}
          <div className="w-full flex flex-col gap-1 p-4 border border-[#D4D4D4] rounded-lg md:full lg:w-[647px]">
            {/* ADD SERVIVCE BUTTON */}
            <div className="w-full flex flex-row justify-between items-end">
              <h3 className="text-[#111] text-md font-medium lg:text-xl lg:font-normal px-0.5">Usługi</h3>
              <AddServiceButton categories={categories!}/>
            </div>

            {/*div for service items*/}
            <div className="mt-5 min-h-40  flex flex-col items-center justify-center gap-12" >
              {servicesForBusinessData && servicesForBusinessData?.length > 0 ? (
                servicesForBusinessData.map((category) => {
                  return (
                    <ServicesServiceList key={category.id} categoryName={category.name}>
                      {category.services && category.services.length > 0 ? (
                        category.services.map((service) => (
                            <ServicesServiceListItem key={service.id} service={service}/>
                        ))
                      ) : <p className="text-sm font-light text-[#555] text-center">Brak usług w tej kategorii</p>
                      }
                    </ServicesServiceList>
                  );
                })
              ) : <p className="text-sm font-light text-[#555] text-center">Brak usług. Stwórz kategorię aby dodawać usługi.</p>
              }
            </div>
          </div>
        </div>
      </div>
  );
}
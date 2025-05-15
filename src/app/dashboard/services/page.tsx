"use client";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { AddServiceButton } from "@/components/dashboard/services/add-service-button";
import { useQuery } from "@tanstack/react-query";
import ServicesCategorySidebar from "@/components/dashboard/services/services-sidebar";
import ServicesServiceList from "@/components/dashboard/services/services-service-list";
import ServicesServiceListItem from "@/components/dashboard/services/services-service-list-item";
import { getServicesForBusiness } from "./actions";

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
    <DashboardContentContainer>
      <div className="flex flex-col gap-5">
        {/*HEADINGS*/}
        <div className="flex flex-col gap-4  py-5">
          <h1 className="text-3xl leading-4 text-[#111111] font-medium">Usługi</h1>
          <h2 className="text-sm text-[#555555] font-light">Dodawaj, zmieniaj i usuwaj oferowane przez Twój serwis usługi.</h2>
        </div>

        {/*CONTENT*/}
        <div className="flex flex-row gap-[20px]">
          {/*LEFT MENU FOR CATEGORIES*/}
          <ServicesCategorySidebar categories={categories!} />

          {/*RIGHT PANEL WITH SERVICES*/}
          <div className="bg-[#FFFFFF] w-[647px] flex flex-col gap-5 px-4 py-10 border-[0.5px] border-[#D4D4D4] rounded-lg ">
            {/* ADD SERVIVCE BUTTON */}
            <div className="w-full flex flex-row justify-end">
              <AddServiceButton categories={categories!}/>
            </div>

            {/*div for service items*/}
            <div className="mt-5 min-h-40 px-9 flex flex-col items-center justify-center gap-12" >
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
    </DashboardContentContainer>
  );
}
import { getRecommendedServices } from "@/app/(landing)/actions";
import BusinessCard from "../business-card";
import LandingSectionLayoutProvider from "./landing-section-layout-provider";

export default async function LandingRecommendedServicesSection() {
  const recommendedServices = await getRecommendedServices()
  const services = recommendedServices.data

  if (!recommendedServices.success) return <p>{recommendedServices.message}</p>

  return (
    <LandingSectionLayoutProvider sectionHeader="Wyróżnione">
      <div className="flex flex-row overflow-x-scroll">
        {services && services.length > 0 ? (
          services.map((service) => (
            <BusinessCard key={service.id} serviceData={service} />
          ))
        ) : (
          <p>{recommendedServices.message}</p>
        )}
      </div>
    </LandingSectionLayoutProvider>
  )
}
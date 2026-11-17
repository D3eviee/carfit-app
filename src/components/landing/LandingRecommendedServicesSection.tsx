import { getRecommendedServices } from "@/lib/data/landing"
import { ServicesCarousel } from "./ServicesCarousel"
import { LandingSection } from "./LandingSection"

export const LandingRecommendedServicesSection = async () => {
  const result = await getRecommendedServices()

  return (
    <LandingSection title="Polecane">
      <ServicesCarousel result={result} emptyMessage="Brak polecanych serwisów" />
    </LandingSection>
  )
}
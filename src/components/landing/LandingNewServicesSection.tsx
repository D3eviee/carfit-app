import { getNewServices } from "@/lib/data/landing"
import { LandingSection } from "./LandingSection"
import { ServicesCarousel } from "./ServicesCarousel"

export const LandingNewServicesSection = async () => {
  const result = await getNewServices()

  return (
    <LandingSection title="Nowe w CarFit">
      <ServicesCarousel result={result} emptyMessage="Brak nowych serwisów" />
    </LandingSection>
  )
}
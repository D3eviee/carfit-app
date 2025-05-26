import LandingSectionLayoutProvider from "./landing-section-layout-provider";
import LandingTopServicesCard from "./landing-top-services-card";
import LandingTopServicesCardMobile from "./landing-top-services-card-mobile";

export default function LandingTopServices() {
  const topServices = ["Wymiana kół", "Wymiana opon", "Detailing", "Czyszczenie auta", "Naprawa silnika"]

  return (
    <LandingSectionLayoutProvider sectionHeader="Najlepsze Kategorie">
        <div className="flex gap-6 overflow-scroll md:hidden">
            {topServices.map(serviceName => (
                <LandingTopServicesCardMobile key={serviceName} serviceCategoryName={serviceName}/>
            ))}
        </div>

        <div className="hidden overflow-scroll md:flex md:gap-8">
            {topServices.map(serviceName => (
                <LandingTopServicesCard key={serviceName} serviceCategoryName={serviceName}/>
            ))}
        </div>
    </LandingSectionLayoutProvider>
  )
}

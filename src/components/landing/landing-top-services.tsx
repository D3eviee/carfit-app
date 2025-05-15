import LandingSectionLayoutProvider from "./landing-section-layout-provider";
import LandingTopServicesCard from "./landing-top-services-card";

export default function LandingTopServices() {
  const topServices = ["Wymiana kół", "Wymiana opon", "Detailing", "Czyszczenie auta", "Naprawa silnika"]

  return (
    <LandingSectionLayoutProvider sectionHeader="Najlepsze Kategorie">
        <div className="flex gap-8 overflow-scroll">
            {topServices.map(serviceName => (
                <LandingTopServicesCard key={serviceName} serviceCategoryName={serviceName}/>
            ))}
        </div>
    </LandingSectionLayoutProvider>
  )
}

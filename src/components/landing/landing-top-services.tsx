import { SERVICES_CATEGORIES } from "@/lib/data";
import LandingSectionLayoutProvider from "./landing-section-layout-provider";
import LandingTopServicesCard from "./landing-top-services-card";
import LandingTopServicesCardMobile from "./landing-top-services-card-mobile";

export default function LandingTopServices() {
  return (
    <LandingSectionLayoutProvider sectionHeader="Najlepsze Kategorie">
        <div className="flex gap-6 overflow-scroll md:hidden">
            {SERVICES_CATEGORIES.map((service, index) => (
                <LandingTopServicesCardMobile key={index} serviceCategoryName={service.name}  serviceCategoryLink={service.url}/>
            ))}
        </div>

        <div className="hidden overflow-scroll md:flex md:gap-8">
            {SERVICES_CATEGORIES.map((service, index) => (
                <LandingTopServicesCard key={index} serviceCategoryName={service.name} serviceCategoryLink={service.url}/>
            ))}
        </div>
    </LandingSectionLayoutProvider>
  )
}

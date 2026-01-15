import { LandingSearchForm } from "@/components/landing/search/landing-search-form";
import { LandingRecommendedServicesSection } from "@/components/landing/landing-recommended-services-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingNewServicesSection } from "@/components/landing/landing-new-services-section";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 md:gap-60 ">
      {/* HEADER */}
      <div className="pt-32 lg:pt-60 flex flex-col gap-5 px-4 md:gap-10 md:px-12 lg:gap-14 xl:px-40 2xl:px-60">
        <LandingHeader/>
        <LandingSearchForm/>
      </div>

      {/* DIFFERENT TYPES OF SERVICES SECTION */}
      <div className="w-full flex flex-col gap-16 overflow-x-hidden lg:gap-20 pl-4 md:px-12 xl:px-40 2xl:px-60">
        <LandingRecommendedServicesSection />
        <LandingNewServicesSection />
      </div>
    </div>
  )
}

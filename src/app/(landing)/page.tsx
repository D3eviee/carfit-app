import LandingSearch from "@/components/landing/search/landing-search";
import LandingRecommendedServicesSection from "@/components/landing/landing-recommended-services-section";
import LandingHeaderText from "@/components/landing/landing-header-text";
import LandingNewServicesSection from "@/components/landing/landing-new-services-section";

export default function Landing() {
  return (
    <div className="flex flex-col gap-24 md:gap-32 ">
      {/* HEADER */}
      <div className="mt-32 flex flex-col gap-5 md:gap-10 lg:gap-14 px-4 md:px-12 xl:px-40 2xl:px-60">
        <LandingHeaderText/>
        {/* SEARCH FORM */}
        <LandingSearch/>
      </div>

      {/* DIFFERENT TYPES OF SERVICES SECTION */}
      <div className="mb-40 w-full flex flex-col gap-16 overflow-x-hidden lg:gap-20 pl-4 md:px-12 xl:px-40 2xl:px-60">
        <LandingRecommendedServicesSection />
        <LandingNewServicesSection />
      </div>
      
    </div>
  )
}

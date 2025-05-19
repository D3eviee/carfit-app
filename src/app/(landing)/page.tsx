import LandingSearchForm from "@/components/landing/landing-search-form";
import LandingRecommendedServicesSection from "@/components/landing/landing-recommended-services-section";
import LandingTopServices from "@/components/landing/landing-top-services";

export default function Landing() {
  return (
    //<div className="mt-64 mx-64 mb-64"></div>
    <div className="relative flex flex-col gap-32 mt-32 px-5 lg:px-60">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-1 text-pretty text-3xl font-semibold lg:text-5xl tracking-tight">
          <h1>Zarezerwuj lokalne</h1>
          <h1>usługi samochodowe</h1>
        </div>

        {/* SEARCH FORM */}
        <LandingSearchForm/>
      </div>

      {/* DIFFERENT TYPES OF SERVICES SECTION */}
      <div className="flex flex-col gap-20 md:gap-32"> 
          <LandingTopServices/>
          <LandingRecommendedServicesSection />
      </div>

      <div>
        
      </div>
    </div>
  )
}

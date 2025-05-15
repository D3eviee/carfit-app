import LandingSearchForm from "@/components/landing/landing-search-form";
import LandingRecommendedServicesSection from "@/components/landing/landing-recommended-services-section";
import LandingTopServices from "@/components/landing/landing-top-services";

export default function Landing() {
  return (
    <div className="mt-64 mx-64 mb-64">
      {/* PAGE HEADER */}
      <div className="mb-11">
        <h1 className="w-full text-6xl font-semibold">Zarezerwuj wizytę</h1>
        <h1 className="w-full text-6xl font-semibold">trzymaj auto w formie</h1>
        {/* <h1 className="w-full text-6xl font-semibold">Book a visit</h1>
        <h1 className="w-full text-6xl font-semibold">keep your car fit</h1> */}
      </div>

      {/* SEARCH FORM */}
      <LandingSearchForm/>

      {/* DIFFERENT TYPES OF SERVICES SECTION */}
      <div className="mb-100 flex flex-col gap-32"> 
          <LandingTopServices/>
          <LandingRecommendedServicesSection />
      </div>
    </div>
  )
}

import { LandingSearchForm } from "@/components/landing/search/LandingSearchForm";
import { LandingRecommendedServicesSection } from "@/components/landing/LandingRecommendedServicesSection";
import { LandingNewServicesSection } from "@/components/landing/LandingNewServicesSection";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Suspense } from "react";
import { ServicesSectionSkeleton } from "@/components/landing/ServicesSectionSkeleton";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 md:gap-60">
      {/* HERO */}
      <div className="flex flex-col gap-5 px-4 pt-32 md:gap-10 md:px-12 lg:gap-14 lg:pt-60 xl:px-40 2xl:px-60">
        <LandingHeader/>
        <LandingSearchForm/>
      </div>

      {/* SERVICES */}
      <div className="flex w-full flex-col gap-16 overflow-x-hidden pl-4 md:px-12 lg:gap-20 xl:px-40 2xl:px-60">
        <Suspense fallback={<ServicesSectionSkeleton title="Polecane" />}>
          <LandingRecommendedServicesSection />
        </Suspense>
        <Suspense fallback={<ServicesSectionSkeleton title="Nowe w CarFit" />}>
         <LandingNewServicesSection />
        </Suspense>
      </div>
    </div>
  )
}
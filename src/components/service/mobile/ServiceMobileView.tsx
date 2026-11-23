import { ServiceMobileHeader } from "@/components/service/mobile/ServiceMobileHeader"
import { ServiceServicesList } from "@/components/service/ServiceServicesList"
import { FullServiceData } from "@/lib/types"
import { ServiceMobileViewGallery } from "./service-mobile-view-gallery"
import { ServiceMobileDetails } from "./ServiceMobileDetails"
import { ServiceMobileReviews } from "./ServiceMobileReviews"
import { ServiceMobileBookingBar } from "./ServiceMobileBookingBar"

export const ServiceMobileView = ({ businessData }: { businessData: FullServiceData }) => {
  const { workingDays, reviews, images, categories } = businessData
  const serviceCount = categories.reduce((acc, curr) => acc + curr.services.length, 0)

  return (
    <>
      <div className="w-full flex flex-col overflow-hidden gap-16">
        {/* TOP OVERVIEW */}
        <div className="w-full flex flex-col overflow-hidden gap-5">
          <ServiceMobileViewGallery images={images} />
          <ServiceMobileHeader serviceHeaderData={businessData} />
        </div>

        {/* DETAILED SECTIONS */}
        <div className="w-full flex-col px-4 space-y-10">
          <ServiceServicesList categoriesData={categories} />

          <div>
            <ServiceMobileDetails
              serviceDescription={businessData.description}
              workingHoursData={workingDays}
              locationData={{ street: businessData.street, city: businessData.town, zipcode: businessData.zipcode }}
              socials={{
                facebookUrl: businessData.facebookUrl,
                instagramUrl: businessData.instagramUrl,
                websiteUrl: businessData.websiteUrl,
              }}
            />
            {/* The booking bar hides once this point is on screen */}
            <div id="service-details-end" aria-hidden className="h-px" />
          </div>
        </div>

        {/* REVIEWS */}
        {reviews.length > 0 && <ServiceMobileReviews reviewsData={reviews} />}
      </div>

      <ServiceMobileBookingBar serviceCount={serviceCount} />
    </>
  )
}
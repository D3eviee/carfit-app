import { ServiceGallery } from "@/components/service/desktop/ServiceGallery";
import { ServiceSummary } from "@/components/service/desktop/ServiceSummary";
import { ServiceServicesList }  from '@/components/service/ServiceServicesList';
import { FullServiceData, ServicePageTitleDataProps } from "@/lib/types";
import { ServiceBreadcrumb } from "./service-breadcrumb";
import { ServiceHeader } from "./ServiceHeader";
import { ServiceDetails } from "../service-details";
import { ServiceReviews } from "./ServiceReviews";

export const ServiceView = ({ businessData }: { businessData: FullServiceData }) => {
  const { workingDays, reviews, images, categories } = businessData
  
  return (
    <div className="py-5 w-full flex flex-col gap-16">
      <div className="w-full flex flex-col space-y-4 px-4 lg:px-8 xl:px-24 2xl:px-40">
        <ServiceBreadcrumb
          name={businessData.name}
          category={businessData.category}
          district={businessData.district}
          town={businessData.town}
        />

        <ServiceHeader serviceHeaderData={businessData} />

        <ServiceGallery images={images} />
      </div>

      <div className="w-full flex flex-row px-4 lg:px-8 lg:gap-4 xl:gap-6 xl:px-24 2xl:px-40">
         <div className="h-full space-y-16 w-full lg:w-2/3 overflow-hidden">
            <ServiceServicesList categoriesData={categories} />

            <ServiceDetails
              serviceDescription={businessData.description}
              workingHoursData={workingDays}
              locationData={{ street: businessData.street, city: businessData.town, zipcode: businessData.zipcode }}
            />
            
            {reviews.length > 0 && <ServiceReviews reviewsData={reviews} />}
          </div>

        <ServiceSummary serviceSummaryData={businessData} />
      </div>
  </div>
  );
}
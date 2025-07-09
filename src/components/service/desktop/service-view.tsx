import { ServiceGallery } from "@/components/service/desktop/service-gallery";
import { ServiceSummary } from "@/components/service/desktop/service-summary";
import { ServiceServicesList }  from '@/components/service/service-services-list';
import { ServicePageTitleDataProps } from "@/lib/types";
import { ServiceBreadcrumb } from "./service-breadcrumb";
import { ServiceHeader } from "./service-header";
import { ServiceDetails } from "../service-details";
import { ServiceReviews } from "../service-reviews";

type ServiceViewProps = {
    description: string;
    images: {
        id: string;
        businessId: string;
        photoUrl: string;
        priority: number;
    }[]
    id: string
    name: string
    phone: string
    categories: {
        id: string
        name: string
        services: {
            description: string
            id: string
            name: string
            duration: number
            price: string
            categoryId: string
        }[];
    }[]
    category: string
    town: string
    zipcode: string
    district: string
    street: string
    workingDays: {
        dayOfWeek: string
        open: string
        close: string
        isOpen: boolean
    }[]
    reviews: {
        id: string
        title: string
        content: string
        client: { name: string }
        createdAt: Date
        rate: number
    }[];
}

export default async function ServiceView({businessData}:{businessData:ServiceViewProps}){
  const {workingDays, reviews, images, categories } = businessData

  // days in correct order for filtering results from db
  const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota" , "Niedziela"];

  // sorting days in correct order
  workingDays!.sort(
    (a, b) => days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek)
  );

  // object containing data for service page tilte component 
  const serviceTitleData: ServicePageTitleDataProps = {
    name: businessData.name,
    phone: businessData.phone,
    category: businessData.category,
    town: businessData.town,
    zipcode: businessData.zipcode,
    district: businessData.district,
    street: businessData.street,
    reviews: businessData.reviews,
    workingDays: businessData.workingDays
  }

  return (
    <div className="py-5 w-full flex flex-col gap-16">
      <div className="w-full flex flex-col space-y-4 px-4 lg:px-8 xl:px-24 2xl:px-40">
        {/* BREADCRUMB*/}
        <ServiceBreadcrumb 
          name={serviceTitleData.name} 
          category={serviceTitleData.category} 
          district={serviceTitleData.district} 
          town={serviceTitleData.town} 
        />

        <ServiceHeader serviceHeaderData={serviceTitleData}/>
        
        {/*SERVICE GALLERY*/}
        <ServiceGallery images={images}/> 
      </div>

      <div className="w-full flex flex-row px-4 lg:px-8 lg:gap-4 xl:gap-6 xl:px-24 2xl:px-40">
         <div className="h-full space-y-16 w-full lg:w-2/3 overflow-hidden">
            <ServiceServicesList categoriesData={categories}/>

            <ServiceDetails
              serviceDescription={businessData.description}
              workingHoursData={workingDays}
              locationData={{street: businessData.street, city: businessData.town, zipcode: businessData.zipcode}}
            />

            {reviews.length > 0 && <ServiceReviews reviewsData={reviews}/>}
         </div>

        <ServiceSummary serviceSummaryData={businessData}/>
      </div>
  </div>
  );
}
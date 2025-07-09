import { ServiceMobileHeader } from "@/components/service/mobile/service-mobile-header";
import { ServiceServicesList }  from '@/components/service/service-services-list';
import { ServicePageTitleDataProps } from "@/lib/types";
import { ServiceMobileViewGallery } from "./service-mobile-view-gallery";
import { ServiceMobileDetails } from "./service-mobile-details";
import { ServiceMobileReviews } from "./service-mobile-reviews";
import { ServiceMobileBookingBar } from "./service-mobile-booking-bar";

type ServiceMobileViewProps = {
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

export default async function ServiceMobileView({businessData}:{businessData:ServiceMobileViewProps}){
    const {workingDays, reviews, images, categories} = businessData
    const serviceCount = categories.reduce((acc, curr) => acc + curr.services.length ,0)

    // object containing data for service page tilte component 
    const serviceHeaderData: ServicePageTitleDataProps = {
      name: businessData.name,
      phone: businessData.phone,
      category: businessData.category,
      town: businessData.town,
      zipcode: businessData.zipcode,
      district: businessData.district,
      street: businessData.street,
      reviews: reviews,
      workingDays: workingDays
    }

  return (
    <>
      <div className="w-full flex flex-col overflow-hidden gap-16 mb-20">
        {/* TOP OVERVIEW */}
        <div className="w-full flex flex-col overflow-hidden gap-5">
          {/* GALLERY */}
          <ServiceMobileViewGallery images={images}/>
          
          {/* HEADER */}
          <ServiceMobileHeader serviceHeaderData={serviceHeaderData}/>
        </div>
        
        {/* DETAILED SECTIONS */}
        <div className="w-full flex-col px-4 space-y-10">
          {/*SERVICES*/}
          <ServiceServicesList categoriesData={categories}/>

          {/* DESCRIPTION */}
          <ServiceMobileDetails 
            serviceDescription={businessData.description}
            workingHoursData={workingDays}
            locationData={{street: businessData.street, city: businessData.town, zipcode: businessData.zipcode}}
          />
        </div>

        {/* REVIEWS */}
        {reviews.length > 0 && <ServiceMobileReviews reviewsData={reviews}/>}
      </div>

      <ServiceMobileBookingBar serviceCount={serviceCount} />
    </>
  );
}
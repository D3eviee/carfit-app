import Image from "next/image";
import { ServiceHeader } from "@/components/service/service-header";
import { ServiceGallery } from "@/components/service/service-gallery";
import { getBusinessData} from "@/actions/actions";
import { ServiceSummary } from "@/components/service/service-summary";
import { ServicePageTitleDataProps } from '@/lib/types';
import { ServiceServicesList }  from '@/components/service/service-services-list';
import { ServiceReviews } from '@/components/service/service-reviews';
import service_location from '../../../../../public/service_location.jpg'
import { BookingButton } from "@/components/service/booking-button";

export default async function Service({ params }: { params: Promise<{ business: string }>}){
  // getting business id from url
  const { business } =  await params
  const id = business.slice(-36)  

  // days in correct order for filtering results from db
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" , "Sunday"];

  //getting business data
  const response = await getBusinessData(id)
  if(!response.data) return <p>ERROR</p>

  const serviceData = response.data
  const {workingDays, reviews, images, categories} = serviceData

  // sorting days in correct order
  workingDays!.sort(
    (a, b) => days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek)
  );

  // object containing data for service page tilte component 
  const serviceTitleData: ServicePageTitleDataProps = {
    name: serviceData.name,
    category: serviceData.category,
    town: serviceData.town,
    zipcode: serviceData.zipcode,
    district: serviceData.district,
    street: serviceData.street,
    reviews: serviceData.reviews,
    workingDays: serviceData.workingDays
  }


  return (
    <div className="mt-10 px-3 md:mt-[52px] lg:mx-60">
      <div className="flex flex-col gap-8">
        {/*SERVICE TITLE*/}
        <ServiceHeader data={serviceTitleData}/>
        
        {/*SERVICE GALLERY*/}
        <ServiceGallery images={images}/>

        {/*BOTTOM SECTION*/}
        <div className="flex flex-row gap-8">
          {/* LEFT ROW */}
          <div className="w-full flex flex-col gap-8 px-1  
          lg:w-3/4 md:p-8 lg:bg-[#FAFAFA] lg:shadow-[0px_0px_6px_2px_#7777771A] lg:border lg:rounded-[10px]">
            {/*SERVICES*/}
            <ServiceServicesList categoriesData={categories}/>

            {/*INFO*/}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl text-[#000000] font-medium md:text-3xl">O nas</h1>
              <p className="text-[#333333] text-[15px] text-pretty font-normal md:leading-5">{serviceData?.description || "No description"} </p>
            </div>

            {/*LOCATION*/}
            <div className="flex flex-col gap-2">
              <h1 className="text-[30px] text-[#000000] font-medium">Lokalizacja</h1>
              <Image src={service_location} alt="Location map" className="w-full border-[0.5px] border-[#CCCCCC] shadow-[0px_4px_4px_0px_#00000040]"/>
            </div>

            {/* REVIEWS */}
            <ServiceReviews reviewsData={reviews}/>
          </div>

          {/*RIGHT ROW*/}
          <div className="hidden lg:flex">
            <ServiceSummary serviceSummaryData={serviceTitleData}/>
          </div>

          <div className="fixed w-full bottom-0 left-0 bg-[#F6F6F6] py-3 px-1 lg:hidden">
            <BookingButton/>
          </div>
          
        </div>
      </div>
    </div>
  );
}

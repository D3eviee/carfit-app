'use client'
import { getBusinessCategoriesAndServices } from "@/app/(landing)/actions";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import BookingChoosingServices from "@/components/booking/booking-choosing-services";
import { NavigationCloseBookingButton } from "@/components/navigation-close-booking-button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Category } from "@/lib/types";
import BookingSummary from "@/components/booking/booking-summary";
import BookingStatusBarMobile from "@/components/booking/booking-status-bar-mobile";
import BookingSummaryMobile from "@/components/booking/booking-summary-mobile";

export default function Booking() {
  const [bookingStep, setBookingStep] = useState(1)
  
  // getting business id from url
  const params = useParams()
  const id = typeof params.business === 'string'
    ? params.business.match(/[0-9a-fA-F\-]{36}$/)?.[0]
    : ""

  //getting service data
  const { data: businessCategoriesAndServicesData, status: businessCategoriesAndServicesStatus  } = useQuery({
    queryKey: ["businessCategoriesAndServicesData", id],
    queryFn: async () => {
      if(id == undefined) return 
      const response = getBusinessCategoriesAndServices(id);   
      return response
    },
  });

  const services = businessCategoriesAndServicesData?.data?.map((item: Category) => {
    return item.services;
  }).flat();


  if(businessCategoriesAndServicesStatus == "pending") return <p>PENDING</p>
  if(businessCategoriesAndServicesStatus == "error") return <p>ERROR</p>

  return (
    <div className="absolute w-full h-full top-0 bg-white">
      {/* NAVIGATION */}
      <nav className="relative flex flex-row justify-between items-center px-2 pt-11">
        <Link href="/"><h3 className="font-semibold text-2xl/7">CarFit</h3></Link>
        <NavigationCloseBookingButton/>
      </nav>
      
      {/* CONTENT */}
      <div className="px-2 mt-16 flex justify-between lg:mt-[100px] lg:mx-[285px]">
        {/* CHOOSING SERVICE */}
        {(businessCategoriesAndServicesData && bookingStep == 1) && <BookingChoosingServices categoriesData={businessCategoriesAndServicesData.data!}/>}
        {bookingStep == 2 && <BookingCalendar servicesData={services!}/>}
      
        {/* APPOINTMENT SUMMARY */}
        <BookingSummary 
          bookingStep={bookingStep} 
          setNextBookingStep={() => {setBookingStep(prev => prev+1)}} 
          setPreviousBookingStep={() => {setBookingStep(prev => prev-1)}} 
          services={services!}
          businessId ={id!}
        />

        {bookingStep == 3 && 
        <BookingSummaryMobile 
          bookingStep={bookingStep} 
          setNextBookingStep={() => {setBookingStep(prev => prev+1)}} 
          setPreviousBookingStep={() => {setBookingStep(prev => prev-1)}} 
          services={services!}
          businessId ={id!}
        />}
        

        {(bookingStep == 1 || bookingStep == 2) &&<BookingStatusBarMobile
          bookingStep={bookingStep} 
          setNextBookingStep={() => {setBookingStep(prev => prev+1)}} 
          setPreviousBookingStep={() => {setBookingStep(prev => prev-1)}} 
          services={services!}
          businessId ={id!}
        />}
      </div>
    </div>

     
  )
}
 
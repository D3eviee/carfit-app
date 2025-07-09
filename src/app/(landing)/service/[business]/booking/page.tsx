'use client'
import { getBusinessCategoriesAndServices } from "@/app/(landing)/actions";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import { BookingCloseButton } from "@/components/booking/booking-close-button";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Category } from "@/lib/types";
import BookingSummary from "@/components/booking/booking-summary";
import BookingStatusBarMobile from "@/components/booking/booking-status-bar-mobile";
import BookingSummaryMobile from "@/components/booking/booking-summary-mobile";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import BookingServices from "@/components/booking/booking-services";
import BookingDetailsFromUser from "@/components/booking/booking-details-from-user";
import { BookingBackButton } from "@/components/booking/booking-back-button";

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
  })

  const services = businessCategoriesAndServicesData?.data?.map((item: Category) => {
    return item.services;
  }).flat();


  if(businessCategoriesAndServicesStatus == "pending") return <Spinner/>
  if(businessCategoriesAndServicesStatus == "error") return <Error/>

  return (
    <div className="absolute w-full h-full top-0 bg-white flex flex-col overflow-hidden">
      {/* NAVBAR */}
      <nav className="relative py-10 px-4">
        <BookingBackButton 
          bookingStep={bookingStep}
          previouStepFn={() => {setBookingStep(prev => prev-1)}}
        />
        <BookingCloseButton/>
      </nav>
      
      {/* SERVICES */}
      <div className="h-full flex flex-col px-4 overflow-hidden">
        {/* CHOOSING SERVICE */}
        {(businessCategoriesAndServicesData && bookingStep == 1) 
        && <BookingServices categoriesData={businessCategoriesAndServicesData.data!}/>}
        
        {bookingStep == 2 && <BookingCalendar servicesData={services}/>}
        {bookingStep == 3 && <BookingDetailsFromUser/>}
      
        {/* APPOINTMENT SUMMARY FOR BIG DISPLAYS*/}
        <BookingSummary 
          bookingStep={bookingStep} 
          setNextBookingStep={() => {setBookingStep(prev => prev+1)}} 
          setPreviousBookingStep={() => {setBookingStep(prev => prev-1)}} 
          services={services!}
          businessId ={id!}
        />

        {bookingStep == 4 && 
        <BookingSummaryMobile 
          bookingStep={bookingStep} 
          setNextBookingStep={() => {setBookingStep(prev => prev+1)}} 
          setPreviousBookingStep={() => {setBookingStep(prev => prev-1)}} 
          services={services!}
          businessId ={id!}
        />}
      </div>

      {/* MOBILE SUMMARY BAR FOR SMALL SCREENS*/}
        {(bookingStep == 1 || bookingStep == 2 || bookingStep == 3) &&
          <BookingStatusBarMobile
            bookingStep={bookingStep} 
            setNextBookingStep={() => {setBookingStep(prev => prev+1)}} 
            setPreviousBookingStep={() => {setBookingStep(prev => prev-1)}} 
            services={services}
          />}
    </div>     
  )
}
 
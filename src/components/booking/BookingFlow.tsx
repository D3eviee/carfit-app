"use client"
import { useEffect, useMemo, useState } from "react"
import { Category } from "@/lib/types"
import { cn } from "@/utils"
import { useAppointmentStore, useCalendarStore } from "@/lib/store"
import { BookingCalendar } from "@/components/booking/BookingCalendar"
import { BookingSummary } from "@/components/booking/desktop/BookingSummary"
import { BookingStatusBarMobile } from "@/components/booking/mobile/BookingStatusBarMobile"
import { BookingServices } from "@/components/booking/BookingServices"
import { ButtonBookingAbort } from "@/components/buttons/ButtonBookingAbort"
import { BookingPreviousStepButton } from "@/components/buttons/booking-previous-step-button"
import { BookingUserInput } from "./BookingUserInput"
import { BookingSummaryMobile } from "./mobile/BookingSummaryMobile"

type BookingFlowProps = {
  businessId: string
  categories: Category[]
}

export const BookingFlow = ({ businessId, categories }: BookingFlowProps) => {
    const [bookingStep, setBookingStep] = useState(1)
    const goToPreviousStep = () => setBookingStep((prev) => prev - 1)
    const goToNextStep = () => setBookingStep((prev) => prev + 1)

    const services = useMemo(() => categories.flatMap((category) => category.services), [categories])
    
    // Fresh start: keep only services from THIS business (e.g. picked with "Umów"), clear date/time/details
    useEffect(() => {
        const appointment = useAppointmentStore.getState()
        const validIds = new Set(services.map((s) => s.id))
        appointment.setSelectedServices(appointment.selectedServices.filter((id) => validIds.has(id)))
        appointment.resetAppointmentTime()
        appointment.resetClientMessage()
        appointment.setClientCar("")
        useCalendarStore.getState().resetCalendarStore()
    }, [services])
    
    return (
        <div className="absolute w-full h-full top-0 bg-white flex flex-col overflow-hidden lg:gap-5">
            {/* NAVBAR */}
            <nav className={cn("flex flex-row py-4 px-4 lg:px-20 xl:px-40 2xl:px-64 lg:py-8", bookingStep == 1 ? "justify-end" : "justify-between")}>
                <BookingPreviousStepButton bookingStep={bookingStep} previouStepFn={goToPreviousStep} />
                <ButtonBookingAbort />
            </nav>
            
            {/* STEPS */}
            <div className="h-full w-full justify-center flex flex-row overflow-hidden gap-10 xl:gap-20 px-4 lg:px-8 xl:px-32 2xl:px-64">
                {bookingStep == 1 && <BookingServices categoriesData={categories} />}
                {bookingStep == 2 && <BookingCalendar servicesData={services} businessId={businessId} />}
                {bookingStep == 3 && <BookingUserInput />}
                {bookingStep == 4 && <BookingSummaryMobile bookingStep={bookingStep} services={services} businessId={businessId} />}
                
                {/* APPOINTMENT SUMMARY FOR BIG DISPLAYS */}
                <div className="hidden lg:block lg:w-6/12">
                    <BookingSummary
                        bookingStep={bookingStep}
                        setNextBookingStep={goToNextStep}
                        resetBookingProcess={() => setBookingStep(1)}
                        services={services}
                        businessId={businessId}
                    />
                </div>
            </div>
            
            {/* MOBILE SUMMARY BAR FOR SMALL SCREENS */}
            {bookingStep <= 3 && <BookingStatusBarMobile bookingStep={bookingStep} setNextBookingStep={goToNextStep} services={services} /> }
        </div>
    )
}
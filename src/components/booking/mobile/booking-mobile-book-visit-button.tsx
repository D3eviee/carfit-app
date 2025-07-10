'use client'
import { addMinutes, getMonth, getYear } from "date-fns";
import { NewReservation, Service } from "@/lib/types";
import { useAppointmentStore, useCalendarStore } from "@/lib/store";
import { addReservation } from "@/app/(landing)/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { userAuth } from "@/lib/auth";
import { useState } from "react";
import { BookingMobileLoginModal } from "./booking-mobile-login-modal";

type BookingMobileBookVisitButtonProps = {
    services: Service[]
    businessId: string
}

export default function BookingMobileBookVisitButton({services, businessId}:BookingMobileBookVisitButtonProps) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
    const router = useRouter()

    // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
    const clientMessage = useAppointmentStore((store) => store.clientMessage)
    
    // ZUSTAND STORE FOR RESETING APPOITNMENT BOOKING VALUES
    const resetClientMessage = useAppointmentStore((store) => store.resetClientMessage)
    const resetAppointmentTime = useAppointmentStore((store) => store.resetAppointmentTime)
    const resetSelectedServices = useAppointmentStore((store) => store.resetSelectedServices)
    const resetCalendarStore = useCalendarStore((store) => store.resetCalendarStore)

    const {mutateAsync} = useMutation({
        mutationKey: ["addReservation"],
        mutationFn: async () => {
            try{
                const selectedServiceObjects = services.filter(service => selectedServices.includes(service.id))
                const appointmentDuration = selectedServiceObjects.reduce((total, service) => total + service.duration, 0)
                const appointmentCharge = selectedServiceObjects.reduce((total, service) => total + parseFloat(service.price), 0)

                const newAppointmentData: NewReservation = {
                    businessId: businessId,
                    servicesIds: selectedServices,
                    reservationYear: getYear(appointmentTime),
                    reservationMonth: getMonth(appointmentTime),
                    reservationStart: appointmentTime,
                    reservationEnd: addMinutes(appointmentTime, appointmentDuration),
                    duration: appointmentDuration,
                    charge: appointmentCharge,
                    status: "Zarezerwowana",
                    clientMessage: clientMessage,
                }
                
                const response = await addReservation(newAppointmentData)
                return response
            }catch(error){
                console.error("Problem podczas dodawania rezerwacji", error)
            }
        }
    })
    
    const handleBooking = async () => {
        try {
            const user = await userAuth()
            if (!user.id) {
                setIsLoginModalOpen(true)
                return
            }

            const result = await mutateAsync()

            if (result) {
                resetClientMessage()
                resetAppointmentTime()
                resetSelectedServices()
                resetCalendarStore()
                router.push('/')
            }
            else console.warn("Rezerwacja nie powiodła się."); 
        } catch (error) {
            console.log("Wystąpił błąd")
        }
    }
    
    return (
        <>
        <button 
            onClick={handleBooking}
            className="w-full text-center font-normal text-base rounded-xl md:w-full py-3 bg-gradient-to-b from-[#313131] to-[#141414] text-[#FFFFFF] hover:bg-[#333]"
        >
            Zarezerwuj
        </button>

        <BookingMobileLoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
        />
        </>
    )
}
      
"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useAppointmentStore, useCalendarStore, useModalStore, useToastStore } from "@/lib/store"
import { createReservation } from "@/actions/booking/create-reservation"
import { BookinLoginModal } from "@/components/modals/booking-login-modal"

type BookingButtonBookAppointmentProps = {
  businessId: string
}

export const BookingButtonBookAppointment = ({ businessId }: BookingButtonBookAppointmentProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const openModal = useModalStore((store) => store.openModal)
    const showToast = useToastStore((store) => store.showToast)

    // Appointment store data
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
    const clientMessage = useAppointmentStore((store) => store.clientMessage)
    const clientCar = useAppointmentStore((store) => store.clientCar)
    const setAppointmentTime = useAppointmentStore((store) => store.setAppointmentTime)
    const resetBooking = useAppointmentStore((store) => store.resetBooking)
    const resetCalendarStore = useCalendarStore((store) => store.resetCalendarStore)

    
    const { mutate, isPending } = useMutation({
        mutationKey: ["createReservation", businessId],
        mutationFn: async () => {
            if (!appointmentTime) throw new Error("No appointment time")
                
            return createReservation({
                businessId,
                serviceIds: selectedServices,
                start: appointmentTime.toISOString(),
                clientMessage,
                clientCar,
            })
        },
        onSuccess: (result) => {
            if (result.success === true) {
                queryClient.invalidateQueries({ queryKey: ["booking-month-reservations", businessId] })
                showToast("Zarezerwowano wizytę", "success")
                resetBooking()
                resetCalendarStore()
                router.push("/")
                return
            }
            if (result.code === "UNAUTHENTICATED") {
                openModal(<BookinLoginModal />)
                return
            }
            
            if (result.code === "SLOT_TAKEN") {
                setAppointmentTime(null)
                queryClient.invalidateQueries({ queryKey: ["booking-month-reservations", businessId] })
            }
            
            showToast(result.message, "error")
        },
        onError: () => showToast("Nie udało się zarezerwować wizyty. Spróbuj ponownie", "error"),
    })

    return (
        <button
            type="button"
            onClick={() => mutate()}
            disabled={isPending || !appointmentTime || selectedServices.length === 0}
            className="w-full text-center font-normal text-base rounded-xl md:w-full py-3 bg-linear-to-b from-[#313131] to-[#141414] text-[#FFFFFF] hover:bg-[#333] hover:cursor-pointer disabled:opacity-60 disabled:cursor-default"
        >
            {isPending ? "Rezerwowanie…" : "Zarezerwuj"}
        </button> 
    )
}
'use client'
import { createPortal } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import { useAppointmentStore, useCalendarStore } from "@/lib/store";

type BookingAbortBookingModalProps = {
  isOpen:boolean
  onClose: () => void
}
export const BookingAbortBookingModal = ({isOpen, onClose}: BookingAbortBookingModalProps) =>  {
  const router = useRouter()
  const path = useParams()

  // ZUSTAND STORE FOR RESEETING BOOKING PROCESS
  const setSelectedDate = useCalendarStore((store) => store.setSelectedDate)
  const resetSelectedServices = useAppointmentStore((store) => store.resetSelectedServices)
  const resetAppointmentTime = useAppointmentStore((store) => store.resetAppointmentTime)
  const resetClientMessage = useAppointmentStore((store) => store.resetClientMessage)

  const handleClosingModal =  () =>  {
    document.body.style.overflow = ""
    onClose()
  }

  const handleBookingAbort = () => {
    router.push(`/service/${path.business}`)
    setTimeout(() =>{
      resetSelectedServices()
      resetAppointmentTime()
      resetClientMessage()
      setSelectedDate(new Date())
      onClose()
    }, 600)
  }

  if(!isOpen) return null

  return (
    createPortal(
      <div className="absolute z-30 bg-[#000]/70 top-0 h-full w-full flex items-center justify-center overflow-scroll px-4">

        <div className="bg-[#FFF] w-full px-4 py-6 overflow-scroll flex flex-col gap-8 rounded-2xl">
          <div className="w-full flex flex-col gap-1">
            <h1 className="text-[#191919] font-semibold text-md leading-6">Czy na pewno chcesz opuścić tę rezerwację?</h1>
            <p className="text-[#191919] font-light text-sm leading-none">Wszystkie informacje zostaną utracone</p>
          </div>

          {/* CONTENT */}
          <div className="w-full flex flex-row gap-5">
            <div 
              onClick={handleClosingModal}
              className="w-full text-center justify-center py-1.5 bg-[#F2F2F7] text-[#000] rounded-lg border shadow-inner-glass hover:cursor-pointer hover:bg-[#E1E1E6]"
            >
              Anuluj
            </div>
            <div 
              onClick={handleBookingAbort}
              className="w-full text-center justify-center py-1.5 bg-[#191919] text-white rounded-lg shadow-inner-glass hover:cursor-pointer hover:bg-[#222]"
            >
              Wyjdź
            </div>
          </div>
        </div>
      </div>, 
    document.body)
  )
}
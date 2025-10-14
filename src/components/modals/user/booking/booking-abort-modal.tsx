'use client'
import { useParams, useRouter } from "next/navigation";
import { useAppointmentStore, useCalendarStore, useModalStore } from "@/lib/store";
import { ExitModalButton } from "../../exit-modal-button";

export const BookingAbortModal = () =>  {
  const router = useRouter()
  const path = useParams()

  // ZUSTAND STORE FOR CLOSING MODAL
  const closeModal = useModalStore(store => store.closeModal)
  // ZUSTAND STORE FOR RESEETING BOOKING PROCESS
  const setSelectedDate = useCalendarStore((store) => store.setSelectedDate)
  const resetSelectedServices = useAppointmentStore((store) => store.resetSelectedServices)
  const resetAppointmentTime = useAppointmentStore((store) => store.resetAppointmentTime)
  const resetClientMessage = useAppointmentStore((store) => store.resetClientMessage)

  const handleBookingAbort = () => {
    router.push(`/service/${path.business}`)
    closeModal()
    resetSelectedServices()
    resetAppointmentTime()
    resetClientMessage()
    setSelectedDate(new Date)
  }

  return (
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <div className="flex flex-col gap-2.5 px-2">
        <p className="text-main-black text-middle leading-none font-semibold">Czy na pewno chcesz opuścić stronę?</p>
        <p className=" text-main-black text-sm leading-none">Postęp rezerwacji zostanie utracony.</p>
      </div>
      
      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton exitFn={closeModal}/>
        
        <div 
          onClick={handleBookingAbort}
          className="w-full text-center justify-center py-2.5 bg-main-black rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#111] active:scale-xs transition duration-75"
        >
          <p className="text-[#FFF]">Wyjdź</p>
          </div>
        </div>
      </div>
  )
}
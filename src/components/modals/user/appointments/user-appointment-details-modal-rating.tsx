"use client"
import { AppointmentModalDetailsSectionContainer } from "@/components/modals/appointment-modal-details-section-container"
import { StarIcon } from "lucide-react"
import { useEditReviewStore } from "@/lib/store"
import { useClientAppointments } from "@/lib/hooks/client/useClientAppointments"
 
export const UserAppointmentDetailsModalRating = ({appointmentId}:{appointmentId: string}) => {
  const toggleIsEditing = useEditReviewStore(store => store.toggleIsEditing)
  const { data: appointments } = useClientAppointments()
  const appointmentDetails = appointments?.find(a => a.id === appointmentId)

  return (
    <AppointmentModalDetailsSectionContainer title="Napisz recenzję">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center px-1.5">
          <div className="flex flex-row gap-1">
            {Array.from({length: 5}).map((_, i) => 
              <StarIcon 
                key ={i}
                size={22}
                strokeWidth="1"
                color="#08F" 
                fill={i + 1 <= appointmentDetails.Review.rate ? "#08F" : "transparent"}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-[#F2F2F6] px-3 py-3 rounded-xl">
        <div className="flex flex-row items-start justify-between">
          <p className="font-semibold text-sm px-3 w-20">Tytył</p>
          <p className="w-full text-black text-sm font-normal">{appointmentDetails.Review.title}</p>
        </div>

        <hr className="h-1 text-[#D4D4D4]"/>

        <div className="flex flex-row items-start justify-between">
          <p className="font-semibold text-sm px-3 w-20">Opinia</p>
          <p className="w-full text-black text-sm font-normal">{appointmentDetails.Review.content}</p>
        </div>
      </div>

      <div className="flex justify-end px-1.5">
        <button 
          type="button"
          onClick={toggleIsEditing}
          className="bg-main-black w-fit px-10 py-1.5 text-sm text-[#FFF] rounded-xl disabled:bg-[#888] "
        >
          Edytuj
        </button>
      </div>
    </AppointmentModalDetailsSectionContainer>
  )
}
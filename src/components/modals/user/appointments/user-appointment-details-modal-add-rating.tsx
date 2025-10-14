import { AppointmentModalDetailsSectionContainer } from "@/components/modals/appointment-modal-details-section-container"
import TextareaAutosize from "react-textarea-autosize"
import { StarIcon } from "lucide-react"
import { useState } from "react"
import { useAddClientReview } from "@/lib/hooks/client/useAddClientReview"
import { Spinner } from "@/components/spinner"
 
export const UserAppointmentDetailsModalAddRating = ({businessId, appointmentId }:{businessId:string, appointmentId:string}) => {
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState<string | null>()
  const [title, setTitle] = useState<string | null>()

  const {mutate, isPending} = useAddClientReview()
  const handleAddingReview = () => mutate({comment: comment, rate: rating, businessId: businessId, title: title, appointmentId:appointmentId})
  
  return (
    <AppointmentModalDetailsSectionContainer title="Napisz recenzję">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center px-1.5">
          <p className="text-[10px] text-[#888]">Kliknij, aby ocenić</p>
          <div className="flex flex-row gap-1">
            {Array.from({length: 5}).map((_, i) => 
              <StarIcon 
                key ={i}
                onClick={() => setRating(i+1)}
                size={22}
                strokeWidth="1"
                color="#08F" 
                fill={i + 1 <= rating ? "#08F" : "transparent"}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-[#F2F2F6] px-3 py-3 rounded-xl">
        <div className="flex flex-row items-start justify-between">
          <p className="font-semibold text-sm px-3 w-20">Tytył</p>
          <TextareaAutosize 
            minRows={1}
            maxRows={6}
            value={title}
            placeholder="Opcjonalnie"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black text-sm font-normal resize-none focus:outline-none caret-[#08F] hover:cursor-pointer"
          />
        </div>

        <hr className="h-1 text-[#D4D4D4]"/>

        <div className="flex flex-row items-start justify-between">
          <p className="font-semibold text-sm px-3 w-20">Opinia</p>
          <TextareaAutosize 
            minRows={1}
            maxRows={6}
            value={comment}
            placeholder="Opcjonalnie"
            onChange={(e) => setComment(e.target.value)}
            className="w-full text-black text-sm font-normal resize-none focus:outline-none caret-[#08F]"/>
        </div>
      </div>

      <div className="flex justify-end px-1.5">
        <button 
          type="button"
          disabled = {isPending || rating == null}
          onClick={handleAddingReview}
          className="bg-main-black w-fit px-10 py-1.5 text-sm text-[#FFF] rounded-xl disabled:bg-[#888] "
        >
          {isPending ? <Spinner color="#FFF"/> : "Dodaj"}
        </button>
      </div>
    </AppointmentModalDetailsSectionContainer>
  )
}
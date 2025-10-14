'use client'
import { AppointmentDetails} from "@/lib/types";
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { UserAppointmentDetailsModalHeader } from "./user-appointment-details-modal-header";
import { UserAppointmentDetailsModalServices } from "./user-appointment-details-modal-services";
import { UserAppointmentDetailsModalNotes } from "./user-appointment-details-modal-notes";
import { UserAppointmentDetailsModalCancel } from "./user-appointment-details-modal-cancel";
import { UserAppointmentDetailsModalAddRating } from "./user-appointment-details-modal-add-rating";
import { UserAppointmentDetailsModalRating } from "./user-appointment-details-modal-rating";
import { useEditReviewStore } from "@/lib/store";
import { UserAppointmentDetailsModalEditRating } from "./user-appointment-details-modal-edit-rating";

export const UserAppointmentDetailsModal = ({appointmentDetails}:{appointmentDetails: AppointmentDetails}) => {
  const {id, business, duration, reservationStart, services , status, clientMessage, Review} = appointmentDetails
  const location = `${business.street}, ${business.district}, ${business.town}`
  const servicesFormatted = services.map(s => s.service)
  const isEditing = useEditReviewStore(store => store.isEditing)

  return (  
    <div className="w-full h-full flex flex-col bg-white md:shadow-2xl md:rounded-4xl md:max-w-[85%] md:h-fit lg:max-w-3/4 xl:max-w-1/2">
      <div className="w-full px-10 py-6">
        <ModalBackButton />
      </div>

      <div className="w-full h-full flex flex-col py-6 px-10 gap-6">
        <UserAppointmentDetailsModalHeader
          duration={duration}
          reservationStart={reservationStart}
          status={status}
          businessName={business.name}
          businessLocation={location}
        />
        
        <div className="w-full h-full flex flex-col gap-6 md:flex-row">
          <UserAppointmentDetailsModalServices services={servicesFormatted} />
          <UserAppointmentDetailsModalNotes clientMessage={clientMessage}/>
        </div>
       
        {( status == "finished" && !Review) && <UserAppointmentDetailsModalAddRating businessId={business.id} appointmentId={id}/> }
        {( Review && !isEditing) && <UserAppointmentDetailsModalRating appointmentId={id} /> }
        {isEditing && <UserAppointmentDetailsModalEditRating appointmentId={id} businessId={id}/>  }
      </div>
      
      {status == "reserved" && <UserAppointmentDetailsModalCancel appointmentId={id}/> }
    </div>
  )
}
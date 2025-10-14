import { AppointmentModalDetailsSectionContainer } from "@/components/modals/appointment-modal-details-section-container"

type UserAppointmentDetailsModalNotesProps = {
    clientMessage:string
}
 
export const UserAppointmentDetailsModalNotes = ({clientMessage}:UserAppointmentDetailsModalNotesProps) => {
  return (
    <AppointmentModalDetailsSectionContainer title="Dodatkowe informacje">
      { clientMessage 
        ? <p className="text-sm text-main-black font-normal">{clientMessage}</p> 
        : <p className="text-sm text-main-black font-light text-center">Nie przekazano dodatkowych informacji</p> 
      }
    </AppointmentModalDetailsSectionContainer>
  )
}


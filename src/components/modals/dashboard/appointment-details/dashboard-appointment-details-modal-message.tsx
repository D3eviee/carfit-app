import { AppointmentModalDetailsSectionContainer } from "@/components/modals/appointment-modal-details-section-container"

type DashboardAppointmentDetailsModalMessageProps = {
    clientMessage:string
}
 
export const DashboardAppointmentDetailsModalMessage = ({clientMessage}:DashboardAppointmentDetailsModalMessageProps) => {
  return (
    <AppointmentModalDetailsSectionContainer title="Dodatkowe informacje">
      { clientMessage 
        ? <p className="text-sm text-main-black font-normal">{clientMessage}</p>
        : <p className="text-sm  text-main-black  font-light">Nie przekazano dodatkowych informacji</p>
      }
    </AppointmentModalDetailsSectionContainer>
  )
}

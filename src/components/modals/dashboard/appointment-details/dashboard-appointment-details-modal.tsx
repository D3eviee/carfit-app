import { AppoinmentProps } from "@/lib/types";
import { DashboardAppointmentDetailsModalNav } from "./dashboard-appointment-details-modal-nav";
import { DashboardAppointmentDetailsModalHeader } from "./dashboard-appointment-details-modal-header";
import { DashboardAppointmentDetailsModalClient } from "./dashboard-appointment-details-modal-client";
import { DashboardAppointmentDetailsModalServices } from "./dashboard-appointment-details-modal-services";
import { DashboardAppointmentDetailsModalMessage } from "./dashboard-appointment-details-modal-message";
import { DashboardAppointmentDetailsModalCancel } from "./dashboard-appointment-details-modal-cancel";

export const DashboardAppointmentDetailsModal = ({appointmentData}:{appointmentData:AppoinmentProps}) => {
  const {appointmentId, charge, service, clientPhone, clientName, clientImage, duration, reservationStart, status, clientMessage, clientCar} = appointmentData

  return(
    <div className="w-full h-full pb-4 flex flex-col bg-white md:shadow-2xl md:rounded-4xl md:max-w-[85%] md:h-fit lg:max-w-3/4 xl:max-w-1/2 overflow-scroll">
      <DashboardAppointmentDetailsModalNav/>
      
      {/* APPOINTMENT DETAILS */}
      <div className="w-full h-full flex flex-col py-6 px-4 sm:px-10 gap-6">
        <DashboardAppointmentDetailsModalHeader
          reservationStart={reservationStart} 
          duration={duration} 
          service={service} 
          status={status}
        />

        <div className="w-full h-full flex flex-col gap-6 md:flex-row">
          <DashboardAppointmentDetailsModalClient clientName={clientName} clientPhone={clientPhone} imageUrl={clientImage} clientCar={clientCar} />
          <DashboardAppointmentDetailsModalServices charge={charge} service={service}/>
        </div>
        <DashboardAppointmentDetailsModalMessage clientMessage={clientMessage}/>
      </div>

      {/* CANCEL APPOINTMENT */}
      {status == "reserved" && <DashboardAppointmentDetailsModalCancel appointmentId={appointmentId}/> }
    </div>
  )
}
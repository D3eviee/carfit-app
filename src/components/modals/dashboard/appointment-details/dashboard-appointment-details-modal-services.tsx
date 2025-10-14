import { AppointmentModalDetailsSectionContainer } from "@/components/modals/appointment-modal-details-section-container"

type DashboardAppointmentDetailsModalServicesProps = {
  service: {
    name: string
    price: string
  }[]
  charge: number
}
 
export const DashboardAppointmentDetailsModalServices = ({service, charge}:DashboardAppointmentDetailsModalServicesProps) => {
  return (
    <AppointmentModalDetailsSectionContainer title="Usługi">
      {service.map((service, index) => 
        <div key={index} className="px-1 flex flex-row justify-between text-[#555] text-sm leading-none font-nomal">
          <p>{service.name}</p>
          <p>{service.price} PLN</p>
        </div>
      )}
      
      <hr className="w-full text-[#D4D4D4]"/>
      
      {/* CHARGE SUMMARY */}
      <div className="px-1 flex flex-row justify-between text-main-black text-sm font-semibold">
        <p>Suma</p>
        <p>{charge} PLN</p>
      </div>
    </AppointmentModalDetailsSectionContainer>
  )
}
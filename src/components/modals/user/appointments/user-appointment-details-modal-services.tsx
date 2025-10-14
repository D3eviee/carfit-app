import { AppointmentModalDetailsSectionContainer } from "@/components/modals/appointment-modal-details-section-container"

type UserAppointmentDetailsModalServicesProps = {
  services : {
    name: string
    price: string
  }[]
}
 
export const UserAppointmentDetailsModalServices = ({services}:UserAppointmentDetailsModalServicesProps) => {
    const totalCharge = services.reduce((acc, item) => acc + parseFloat(item.price), 0)
    
    return (
        <AppointmentModalDetailsSectionContainer title="Usługi">
        {services.map((service, index) => 
            <div key={index} className="px-1 flex flex-row justify-between text-[#555] text-sm leading-none font-nomal">
                <p>{service.name}</p>
                <p>{service.price} PLN</p>
            </div>
        )}
      
        <hr className="w-full text-[#D4D4D4]"/>
      
        {/* CHARGE SUMMARY */}
        <div className="px-1 flex flex-row justify-between text-main-black text-sm font-semibold">
            <p className="text-white bg-[#333] px-2 rounded-md">Suma</p>
            <p className="text-white bg-[#333] px-2 rounded-md">{totalCharge} PLN</p>
        </div>
    </AppointmentModalDetailsSectionContainer>
  )
}
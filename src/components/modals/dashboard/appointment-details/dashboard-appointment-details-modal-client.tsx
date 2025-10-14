'use client'
import Image from "next/image"
import default_image from '@/../public/default_user_image.png'
import { AppointmentModalDetailsSectionContainer } from "@/components/modals/appointment-modal-details-section-container"

type DashboardCalendarModalAppointmentDetailsClientProps = {
    imageUrl:string
    clientName: string
    clientPhone: string
    clientCar: string
}
 
export const DashboardAppointmentDetailsModalClient = ({clientName, clientPhone, imageUrl, clientCar}:DashboardCalendarModalAppointmentDetailsClientProps) => {
  const phoneFormatted = clientPhone.replace(/(.{3})/g, "$1 ")
  
  return (
    <AppointmentModalDetailsSectionContainer title="Klient">
      <div className="px-1 flex flex-col gap-5.5">
        {/* CLIENT IMAGE AND NAME */}
        <div className="flex flex-row gap-2 items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-[0.5px] border-[#F2F2F7] shadow-md">
            <Image alt="user image" src={imageUrl || default_image} fill className="object-cover" />
          </div>
          <p className="text-middle text-main-black">{clientName}</p>
        </div>
        {/* CLIENT INFORMATION */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between text-[#555] text-sm leading-none font-nomal">
            <p>Telefon</p>
            <p>{phoneFormatted}</p>
          </div>  
          { clientCar &&
            <div className="flex flex-row justify-between text-[#555] text-sm leading-none font-nomal">
              <p>Pojazd</p>
              <p>{clientCar}</p>
            </div>  
          }
        </div>
      </div>
    </AppointmentModalDetailsSectionContainer>
  )
}


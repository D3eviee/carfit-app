import { AppointmentDetails} from "@/lib/types";
import Image from "next/image";
import { createPortal } from "react-dom";
import service_image from '@/../public/car_service.jpg'
import { Calendar, Clock4Icon, MapPin, Wrench, X } from "lucide-react";
import UserAppointmenetDetailsDeleteButton from "./user-appointment-details-delete-button";
import { format } from "date-fns";
import UserAppointmenetDetailsRescheduleButton from "./user-appointment-details-reschedule-button";
import { displayAppointmentTime } from "@/utils";

type UserAppointmentDetailsModalProps = {
  isOpen: boolean
  close: () => void
  appointmentDetails: AppointmentDetails
}

export default function UserAppointmentDetailsModal({isOpen, close, appointmentDetails}:UserAppointmentDetailsModalProps){
  
    const location = `${appointmentDetails.business.street}, ${appointmentDetails.business.district}, ${appointmentDetails.business.town}`
    const day = `${format(appointmentDetails.reservationStart, "d")} ${format(appointmentDetails.reservationStart, "LLLL")} ${format(appointmentDetails.reservationStart, "y")}`
    const hour = ` ${format(appointmentDetails.reservationStart, "HH")}:${format(appointmentDetails.reservationStart, "mm")}`
    const dayOfWeek = format(appointmentDetails.reservationStart, "EEEE")
    const total = appointmentDetails.services.reduce((sum, item) => { return Number(item.service.price)+ sum}, 0);

  return (
    <>
      {isOpen && createPortal(
        <div className="fixed top-0 left-0 w-full h-dvh mx-auto my-auto">
          {/* BOX WITH BG FOR CONTENT */}
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[90%] h-[500px] bg-white rounded-md p-4 md:w-3/6  lg:w-2/6 xl:w-4/12">
            {/* BOX WITH CONTENT */}
            <div className="relative w-full h-full">
              {/* MODAL TITLE */}
              <div className="w-full flex flex-row justify-end pb-3">
                <X 
                  size={20} 
                  className="text-[#777] hover:text-[#333] hover:cursor-pointer"
                  onClick={close}
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col gap-3 ">
                  {/* HEADER */}
                <div className="flex flex-row bg-[#F5F6F7] border items-end gap-2 rounded-md">
                  <div className="relative w-[150px] h-[90px] border overflow-hidden rounded-md ">
                    <Image src={service_image} alt="service image" className="h-full w-full object-cover"/>
                  </div>
                  <div className="py-1 pr-2 h-full">
                    <h1 className="w-auto text-[#111] text-base/5 font-medium text-pretty">{appointmentDetails.business.name}</h1>
                  </div>
                </div>

                {/* INFO */}
                <div className="flex flex-col gap-2">
                  {/* APPOINTMENT LOCATION  */}
                   <div className="flex flex-row gap-2 bg-[#F5F6F7] py-1 px-2 rounded border">
                    <MapPin size={20} color="#333" strokeWidth={1.5}/>
                    <h2 className="text-sm text-[#333] font-normal">{location}</h2>
                  </div>
                  {/* APPOINTMENT DATE  */}
                  <div className="flex flex-row gap-2 bg-[#F5F6F7] py-1 px-2 rounded border">
                    <Calendar size={20} color="#333" strokeWidth={1.5}/>
                    <h2 className="text-sm text-[#333] font-normal">{`${dayOfWeek}, ${day}, ${hour}`}</h2>
                  </div>
                  {/* APPOINTMENT DURATION  */}
                  <div className="flex flex-row gap-2 bg-[#F5F6F7] py-1 px-2 rounded border">
                    <Clock4Icon size={20} color="#333" strokeWidth={1.5}/>
                    <h2 className="text-sm text-[#333] font-normal">{displayAppointmentTime(appointmentDetails.duration)}</h2>
                  </div>
                  {/* APPOINTMENT SERVICES  */}
                  <div className="flex flex-col bg-[#F5F6F7] p-2 rounded gap-2 border">
                    <div className="flex flex-row gap-2">
                      <h2 className="text-sm text-[#333] font-normal">Usługi</h2>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      {appointmentDetails.services.map((service, index) => (
                      <div key={index} className="flex flex-row justify-between px-1">
                        <p className="text-sm text-[#000] font-light px-1 py-0.5">{service.service.name}</p>
                        <p className="text-sm text-[#000] font-light tracking-wide">{service.service.price} PLN</p>
                      </div>
                      ))}
                    </div>
                    <hr></hr>
                    <div className="flex flex-row justify-between px-1">
                        <p className="text-sm flex justify-center items-center px-1 py-0.5">Suma</p>
                        <p className="bg-[#111] text-white text-sm flex justify-center items-center px-1 py-0.5 rounded-md tracking-wide">{total} PLN</p>
                    </div>
                  </div>
                  
                </div>
              </div>

              


              {/* CANCEL AND RESCHEDULE APPOINTMENT BUTTON */}
              <div className="absolute flex flex-row  gap-2 bottom-0 w-full">
                <UserAppointmenetDetailsRescheduleButton id={appointmentDetails.id} closeMainModalFn={close}/>
                <UserAppointmenetDetailsDeleteButton id={appointmentDetails.id} closeMainModalFn={close}/>
              </div>
              
            </div>
        </div>
        
        {/* BOX WITH BACKGROUND TO EXIT */}
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-70 -z-10" onClick={close}/>
        </div>
        , document.body)
      }
    </>
  )
}

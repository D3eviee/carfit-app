import { AppointmentDetails} from "@/lib/types";
import { createPortal } from "react-dom";
import { Calendar, Clock4Icon, MapPin, NotebookPen, X } from "lucide-react";
import UserAppointmenetDetailsDeleteButton from "./user-appointment-details-delete-button";
import { format } from "date-fns";
import { displayAppointmentTime } from "@/utils";

type UserAppointmentDetailsModalProps = {
  isOpen: boolean
  close: () => void
  appointmentDetails: AppointmentDetails
}

export default function UserAppointmentDetailsModal({isOpen, close, appointmentDetails}:UserAppointmentDetailsModalProps){
  const {business, duration, reservationStart, services, status} = appointmentDetails
  const location = `${business.street}, ${business.district}, ${business.town}`
  const day = `${format(reservationStart, "d")} ${format(reservationStart, "LLLL")} ${format(reservationStart, "y")}`
  const hour = ` ${format(reservationStart, "HH")}:${format(reservationStart, "mm")}`
  const dayOfWeek = format(reservationStart, "EEEE")
  const total = services.reduce((sum, item) => { return Number(item.service.price)+ sum}, 0);

  return (
    <>
    {isOpen && createPortal(
      <div className="fixed top-0 left-0 w-full h-dvh mx-auto my-auto flex justify-center items-center px-4">
        {/* BOX WITH BG FOR CONTENT */}
        <div className="w-full bg-white rounded-md flex flex-col gap-5 px-4 py-5 max-w-[500px] sm:p-8">
          {/* NAV */}
          <div className="flex flex-row justify-end">
            <div 
              onClick={close}
              className="w-fit backdrop-blur-lg rounded-full shadow-inner-glass border-[0.5px] ring-1 ring-[#FFF] p-2 active:scale-105 transition-all duration-75 ease-in hover:cursor-pointer hover:bg-[#F2F2F7]"
            >
              <X color="#000" size={25} strokeWidth={1.5}/>
            </div>
          </div>
          
          {/* APPOINTMENT INFO */}
          <div className="flex flex-col gap-6">
            {/* BUSINESS NAME AND STATUS*/}
            <div className="flex flex-col gap-3">
              <h1 className="w-full text-[#191919] text-xl font-bold text-pretty">{business.name}</h1>
              <p className="w-fit bg-green-400/30 text-sm text-green-600  px-3 py-0.5 rounded-lg shadow-sm font-normal">{status}</p>
            </div>

            {/* BASIC INFORATION */}
            <div className="flex flex-col gap-3">
              {/* APPOINTMENT LOCATION  */}
              <div className="flex flex-row gap-2">
                <MapPin size={20} color="#333" strokeWidth={2}/>
                <p className="text-sm text-[#333] font-normal">{location}</p>
              </div>
              {/* APPOINTMENT DATE  */}
              <div className="flex flex-row gap-2">
                <Calendar size={20} color="#333" strokeWidth={1.5}/>
                <p className="text-sm text-[#333] font-normal">{`${dayOfWeek}, ${day}, ${hour}`}</p>
              </div>
              {/* APPOINTMENT DURATION  */}
              <div className="flex flex-row gap-2">
                <Clock4Icon size={20} color="#333" strokeWidth={1.5}/>
                <p className="text-sm text-[#333] font-normal">{displayAppointmentTime(duration)}</p>
              </div>

              {appointmentDetails.clientMessage && 
                <div className="flex flex-row gap-2 items-start">
                  <NotebookPen size={20 }color="#333" strokeWidth={1.5}/>
                  <p className="w-full text-sm text-[#333] font-normal text-justify">{appointmentDetails.clientMessage}</p>
                </div>
              }
            </div>
            
            {/* APPOINTMENT SERVICES  */}
            <div className="flex flex-col bg-[#] rounded gap-2 ">
              <p className="text-sm text-[#333] font-bold">Usługi</p>
              
              <div className="flex flex-col gap-1">
                {services.map((service, index) => 
                  <div key={index} className="flex flex-row justify-between px-1">
                    <p className="text-sm text-[#000] font-light px-1 py-0.5">{service.service.name}</p>
                    <p className="text-sm text-[#000] font-light tracking-wide">{service.service.price} PLN</p>
                  </div>
                )}
              </div>
              
              <hr></hr>
              
              <div className="flex flex-row justify-between px-1">
                <p className="text-sm font-medium flex justify-center items-center px-1 py-0.5">Suma</p>
                <p className="bg-[#111] text-white text-sm flex justify-center items-center px-1 py-0.5 rounded-md tracking-wide">{total} PLN</p>
              </div>
            </div>
          </div>

          {/* CANCEL APPOINTMENT BUTTON */}
          {status != "Odwołana" && <UserAppointmenetDetailsDeleteButton id={appointmentDetails.id} closeMainModalFn={close}/>}
        </div>
        
        {/* BOX WITH BACKGROUND TO EXIT */}
        <div className="absolute left-0 top-0 w-full h-full bg-black/80 -z-10" onClick={close}/>
      </div>
      , document.body)
    }
    </>
  )
}

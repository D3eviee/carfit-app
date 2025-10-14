import { CalendarAppointmentOverviewProps } from "@/lib/types";
import { getHours, getMinutes } from "date-fns";
import Image from "next/image";
import client_profile_picture from "@/../public/default_user_image.png"
import { displayAppointmentHours } from "@/utils";
import { useModalStore } from "@/lib/store";
import { DashboardAppointmentDetailsModal } from "@/components/modals/dashboard/appointment-details/dashboard-appointment-details-modal";

export const DashboardCalendarPrimaryDayViewAppointment = ({appointment}:{appointment:CalendarAppointmentOverviewProps}) => {
  const {clientImage, clientName, duration, reservationStart, service, status} = appointment
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningDetailsModal = () => openModal(<DashboardAppointmentDetailsModal appointmentData={appointment}/>)
  const startHour = getHours(reservationStart)-6;

  const startMinutes = getMinutes(reservationStart);
  const blockHeight = Math.round(duration * 1.29);
  const top = (startHour * 80 + startMinutes * 30) + 2;

  const statusColor = status == "finished" ? "#1E6EF3" : "#35C759"
  const appointmentTitle = service.length == 1 ? `${service[0].name}` : `${service[0].name} i ${service.length} inne usługi`

  return (
    <div
      onClick={handleOpeningDetailsModal}
      className="absolute left-1/2 -translate-x-1/2 trans w-[95%] text-white text-sm bg-[#191919] rounded-xl hover:cursor-pointer hover:bg-[#2B2B2B] active:scale-[0.98]"
      style={{ top:`${top}px`, height: `${blockHeight}px`, backgroundColor: statusColor}}
    >
      {duration <= 30 && 
        <div className="flex flex-row justify-between items-center px-4 h-full text-white text-sm">
          <p className="font-semibold leading-none">{appointmentTitle}</p>
          <p className="font-normal leading-none">{displayAppointmentHours(reservationStart, duration)}</p>
        </div>
      }

      {( duration > 30 && duration < 60 ) && 
        <div className="w-full h-full flex flex-row justify-between items-center px-4">
          <div className="w-full flex flex-col gap-1.5 text-sm">
            <p className="font-semibold leading-none">{appointmentTitle}</p>
            <p className="font-normal leading-none">{displayAppointmentHours(reservationStart, duration)}</p>
          </div>

          <div className="w-full flex flex-row items-center gap-2 justify-end">
            <div className="relative min-w-7 min-h-7 max-w-7 max-h-7 overflow-hidden rounded-full aspect-square">
              <Image 
                src={clientImage || client_profile_picture}
                alt="client picture"
                className="object-cover"
                fill
              />
            </div>
            <p className="font-normal text-sm leading-none">{clientName}</p>
          </div>
        </div>
      }  

      {duration >= 60  && 
        <div className="w-full flex flex-row justify-between p-4 ">
          <div className="w-full flex flex-col gap-1.5 text-sm">
            <p className="font-semibold leading-none">{appointmentTitle}</p>
            <p className="font-normal leading-none">{displayAppointmentHours(reservationStart, duration)}</p>
          </div>

          <div className="w-full flex flex-row items-center gap-2 justify-end">
            <div className="relative min-w-7 min-h-7 max-w-7 max-h-7 overflow-hidden rounded-full aspect-square">
              <Image 
                src={clientImage || client_profile_picture}
                alt="client picture"
                className="object-cover"
                fill
              />
            </div>
            <p className="font-normal text-sm leading-none">{clientName}</p>
          </div>
        </div>
      } 
    </div>
  )
} 
    

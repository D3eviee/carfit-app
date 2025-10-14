import { CalendarAppointmentOverviewProps } from "@/lib/types";
import { getHours, getMinutes } from "date-fns";
import Image from "next/image";
import client_profile_picture from "@/../public/default_user_image.png"
import { displayAppointmentHours } from "@/utils";
import { useModalStore } from "@/lib/store";
import { DashboardAppointmentDetailsModal } from "@/components/modals/dashboard/appointment-details/dashboard-appointment-details-modal";

export const DashboardCalendarMobileDayViewAppointment = ({appointment}:{appointment:CalendarAppointmentOverviewProps}) => {
  const openModal = useModalStore(store => store.openModal)

  const { reservationStart, duration, service, clientName, clientPhone, clientImage } = appointment

  const startHour = getHours(reservationStart)-6;
  const startMinutes = getMinutes(reservationStart);
  const blockHeight = Math.round(duration * 1.24)+ 1;
  const top = (startHour * 80 + startMinutes * 1.33)+2;
  const firstService = service[0].name
  const numberOfServices = service.length

  const handleOpeningDetailsModal = () => openModal(<DashboardAppointmentDetailsModal appointmentData={appointment}/>)
  
  return (
      <div
        onClick={handleOpeningDetailsModal}
        className="absolute left-1/2 -translate-x-1/2 trans w-[95%] text-white text-sm bg-[#191919] rounded-xl hover:cursor-pointer hover:bg-[#2B2B2B] active:scale-[0.98]"
        style={{ top:`${top}px`, height: `${blockHeight}px`}}
      >

      {duration <= 30 && 
        <div className="flex flex-row justify-between items-center px-4 border h-full ">
          <p className="font-medium text-xs text-[#F9F9F9]">{firstService} {numberOfServices > 1 && `+ ${numberOfServices-1} usługa`}</p>
          <p className="font-normal text-xs text-[#F9F9F9]">{displayAppointmentHours(reservationStart, duration)}</p>
        </div>
      }

      {( duration > 30 && duration <= 90 ) && 
        <div className="flex flex-row justify-between h-full p-4">
          <p className="font-medium text-xs text-[#F9F9F9]">{firstService} {numberOfServices > 1 && `+ ${numberOfServices-1} usługa`}</p>
          <p className="font-normal text-xs text-[#F9F9F9]">{displayAppointmentHours(reservationStart, duration)}</p>
        </div>
      }

      {duration > 90 && 
        <div className="flex flex-col justify-between border-1 h-full p-4">
          <div className="flex flex-row justify-between">
            <p className="font-medium text-xs text-[#F9F9F9]">{firstService} {numberOfServices > 1 && `+ ${numberOfServices-1} usługa`}</p>
            <p className="font-normal text-xs text-[#F9F9F9]">{displayAppointmentHours(reservationStart, duration)}</p>
          </div>

          <div className="flex flex-row gap-2">
            <div className="relative h-8 w-8 overflow-clip rounded-full">
              <Image 
                src={clientImage || client_profile_picture}
                alt="client picture"
                className="object-cover"
                fill
              />
            </div>
            <div className="flex flex-col gap-0.5px">
              <p className="font-medium text-xs text-[#F9F9F9]">{clientName}</p>
              <p className="font-light text-xs text-[#F9F9F9]">{clientPhone}</p>
            </div>
          </div>
        </div>
      }  
    </div>
  )
}
import { CalendarAppointmentOverviewProps } from "@/lib/types";
import { getHours, getMinutes } from "date-fns";
import Image from "next/image";
import client_profile_picture from "@/../public/default_user_image.png"
import { displayAppointmentHours } from "@/utils";
import CalendarEventModal from "./calendar-event-modal";
import { useState } from "react";

export default function CalendarWeekEvent({event}:{event:CalendarAppointmentOverviewProps}) {
  //modal state
  const [isOpen, setIsOpen] = useState(false);

  console.log(event)


  const startHour = getHours(event.reservationStart)-6;
  const startMinutes = getMinutes(event.reservationStart);
  const blockHeight = Math.round(event.duration * 1.31);
  const top = (startHour * 80 + startMinutes * 1.33)+4;

  const colors = ["#9088D4", "#6C91C2", "#581A57", "#D36135", "#344532", "#075056", "#F25287"] 
  const randomColor = colors[Math.floor(Math.random() * 8)]
  const firstService = event.service[0].name
  const numberOfServices = event.service.length
  
  return (
    <>
      <div
        onClick={()=> {setIsOpen(true)}}
        className="absolute left-1/2 -translate-x-1/2 trans w-[96%] text-white text-sm rounded-md px-2 py-1 hover:cursor-pointer"
        style={{ top: `${top}px`, height: `${blockHeight}px`, backgroundColor: `${randomColor}` }}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col">
            <p className="font-medium text-xs">{firstService} {numberOfServices > 1 && `+ ${numberOfServices-1} usługa`}</p>
            <p className="font-light text-xs">{displayAppointmentHours(event.reservationStart, event.duration)}</p>
          </div>

          {event.duration > 60 && 
          <div className="flex flex-row gap-1">
            <div>
            {event.clientImage ?
              (<Image
                src={event.clientImage}
                alt="client picture"
                className="rounded-full  h-[15px] w-[15px] mt-1"
                width={30}
                height={30}
              />)
              : (
              <Image
                src={client_profile_picture}
                alt="client picture"
                className="rounded-full  h-[35px] w-[35px] mt-1"
                width={30}
                height={30}
              />)
              }
            </div>
            <div className="flex flex-col">
              <p className="font-normal text-xs">{event.clientName}</p>
              <p className="font-light text-xs">{event.clientPhone}</p>
            </div>
          </div>
          }
        </div>
      </div>

      {/* MODAL FOR EVENT OVERVIEW */}
      <CalendarEventModal appointmentData={event} onClose={() => {setIsOpen(false)}} open={isOpen}/>
    </>
  );
}
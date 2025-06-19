import { CalendarAppointmentOverviewProps, CalendarDayViewEventProps } from "@/lib/types";
import { addMinutes, format, getHours, getMinutes } from "date-fns";


type CalendarDayViewEvent = {
  openModal: () => void
  appointmentData : CalendarAppointmentOverviewProps
}


export default function CalendarDayViewEvent({openModal, appointmentData}:CalendarDayViewEvent) {
  const startHour = getHours(appointmentData.reservationStart) - 6;
  const startMinutes = getMinutes(appointmentData.reservationStart);
  const blockHeight = Math.round(appointmentData.duration * 1.3);
  const top = (startHour * 81.25 + startMinutes * 1.33)

  const appointmentStartHour = format(appointmentData.reservationStart, "H")
  const appointmentStartMinute = format(appointmentData.reservationStart, "mm")
  const appointmentFinishHour = format(addMinutes(appointmentData.reservationStart, appointmentData.duration), "H")
  const appointmentFinishMinute = format(addMinutes(appointmentData.reservationStart, appointmentData.duration), "mm")

  return (
    <div
      onClick={openModal}
      className="absolute left-1/2 -translate-x-1/2 trans w-[95%] bg-[#9088D4] text-white text-sm rounded-md p-2"
      style={{
        top: `${top}px`,
        height: `${blockHeight}px`,
      }}
    >
      <div className="h-full w-full flex flex-row justify-between p-1">
        <div className="flex flex-col">
          <div className="w-full flex flex-col">
            {appointmentData.service.map((item, index) => <p key={index} className="font-normal text-xs">{item.name}</p>)}
          </div>
          <p className="w-full font-light text-xs">{`${appointmentStartHour}:${appointmentStartMinute} - ${appointmentFinishHour}:${appointmentFinishMinute}`}</p>
        </div>
      </div>
    </div>
  );
}
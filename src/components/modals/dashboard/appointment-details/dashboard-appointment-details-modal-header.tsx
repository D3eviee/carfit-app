'use client'
import { DashboardReservationListItemStatus } from "@/components/dashboard/main/dashboard-reservation-list-item-status";
import { addMinutes, format } from "date-fns";
import { pl } from "date-fns/locale";
import { CalendarDaysIcon, Clock } from "lucide-react";

type DashboardCalendarModalAppointmentDetailsHeaderProps = {
    reservationStart:Date
    duration: number
    service: {
        name: string
        price: string
    }[]
    status: string
}
 
export const DashboardAppointmentDetailsModalHeader = ({duration, reservationStart, service, status}:DashboardCalendarModalAppointmentDetailsHeaderProps) => {
    // DATE FORMATTING
    const rawShortAppointmentMonth = format(reservationStart, "LLL", { locale: pl })
    const shortAppointmentMonth = rawShortAppointmentMonth.charAt(0).toUpperCase() + rawShortAppointmentMonth.slice(1)
    const rawDayOfWeek = format(reservationStart, "EEEE", { locale: pl })
    const dayOfWeek = rawDayOfWeek.charAt(0).toUpperCase() + rawDayOfWeek.slice(1)
    const appointmentDayOfMonth = format(reservationStart, "d", { locale: pl })
    const appointmentYear = format(reservationStart, "y")
    const fullDate = `${dayOfWeek}, ${appointmentDayOfMonth} ${shortAppointmentMonth} ${appointmentYear}` 

    // APPOINTMEENT TITLE FORMATTING
    const appointmentTitle = service.length == 1 ? `${service[0].name}` : `${service[0].name} i ${service.length} inne usługi`
    
    // TIME FORMATTING
    const appointmentEndTime = addMinutes(reservationStart, duration)
    const formattedAppointmentStart = `${format(reservationStart, 'kk')}:${format(reservationStart, 'mm')}`
    const formattedAppointmentEnd = `${format(appointmentEndTime, 'kk')}:${format(appointmentEndTime, 'mm')}`
    const fullTime = `${formattedAppointmentStart} - ${formattedAppointmentEnd}`
    
    return (
        <div className="w-full flex flex-col gap-6">
            {/* APPOINTMENT STATUS */}
            <DashboardReservationListItemStatus status={status}/>
            {/* APPOINTMENT TITLE */}
            <h1 className="text-2xl text-main-black font-bold leading-none">{appointmentTitle}</h1>
            {/* APPOINTMENT DETALIS  */}
            <div className="flex flex-col gap-3 text-sm text-main-black">
                {/* APPOINTMENT DATE */}
                <div className="w-fit h-fit flex flex-row items-center gap-2 px-2 py-1 rounded-lg bg-[#F5F0FF] text-[#6D28D9] border-[0.5px] border-[#E0D4FF]">
                    <CalendarDaysIcon size={18} strokeWidth={2} color="#6D28D9"/>
                    <p className="text-sm font-medium leading-none">{fullDate}</p>
                </div>
                {/* APPOINTMENT TIME */}
                <div className="w-fit h-fit flex flex-row items-center gap-2 px-2 py-1 rounded-lg bg-[#FAE8FF] text-[#C026D3] border-[0.5px] border-[#F5D0FE]">
                    <Clock size={18} strokeWidth={2} color="#C026D3"/>
                    <p className="text-sm font-medium leading-none">{fullTime}</p>
                </div>
            </div>
        </div>
    )
}
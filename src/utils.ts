'use client'
import { type ClassValue, clsx } from "clsx"
import { addMinutes, format } from "date-fns"
import { useParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function displayAppointmentHours(appointmentStart:Date, appointmentDuration: number){
  const appointmentStartHour = format(appointmentStart, "H")
  const appointmentStartMinute = format(appointmentStart, "mm")
  const appointmentFinishHour = format(addMinutes(appointmentStart, appointmentDuration), "H")
  const appointmentFinishMinute = format(addMinutes(appointmentStart, appointmentDuration), "mm")

  return `${appointmentStartHour}:${appointmentStartMinute} - ${appointmentFinishHour}:${appointmentFinishMinute}`
}

 export function useServiceIdFromParams() {
    const param = useParams();
    
    if (Array.isArray(param.business)) {
        return param.business[param.business.length - 1]; // Handle case if it's an array
    } else if (param.business) {
        return param.business.slice(-36);
    } else {
        return "";
    }
}

export function displayAppointmentTime(duration: number){
    const hours = Number(Math.floor(duration/60))
    const minutes = Number(duration%60)
    
    if(hours == 0) return `${minutes}min` 
    else if(minutes == 0 )return `${hours}h` 
    else return `${hours}h ${minutes}min`
}
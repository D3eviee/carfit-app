'use client'
import { type ClassValue, clsx } from "clsx"
import { addMinutes, differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInYears, format } from "date-fns"
import { useParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createLinkFormat = (id:string, companyName:string) : string  => {
    const companyNameToLowerCase = companyName.toLowerCase()
    const companyLink = companyNameToLowerCase.replaceAll(" ", "-")
    return `/service/${companyLink}-${id}`
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

//function for displaying readable phone number
export function formatPhoneNumber(rawPhoneNumber: string){
    const phone = `+48 ${String(rawPhoneNumber).slice(0,3)} ${String(rawPhoneNumber).slice(3,6)} ${String(rawPhoneNumber).slice(6,9)}`
    return phone
} 

export function checkImageType(uploadedFile: File): FormData | null {
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"]  
  if (!validFileTypes.includes(uploadedFile.type)) return null

  const formData = new FormData()
  formData.append('image', uploadedFile)
  return formData;
}

export function displayAddedTime (createdAt:Date){
  const now = new Date()

  const diffSeconds = differenceInSeconds(now, createdAt)
  if (diffSeconds < 60) return diffSeconds === 1 ? "1 sekunda temu" : `${diffSeconds} sekund temu`

  const diffMinutes = differenceInMinutes(now, createdAt)
  if (diffMinutes < 60) return diffMinutes === 1 ? "1 minuta temu" : `${diffMinutes} minut temu`
  
  const diffHours = differenceInHours(now, createdAt)
  if (diffHours < 24) return diffHours === 1 ? "1 godzina temu" : `${diffHours} godziny temu`
  
  const diffDays = differenceInDays(now, createdAt)
  if (diffDays < 30) return diffDays === 1 ? "1 dzień temu" : `${diffDays} dni temu`
  
  const diffMonths = differenceInMonths(now, createdAt)
  if (diffMonths < 12)  return diffMonths === 1 ? "1 miesiąc temu" : `${diffMonths} miesiące temu`
  
  const diffYears = differenceInYears(now, createdAt)
  if (diffYears === 1) return "1 rok temu"
  
  if (diffYears > 1 && diffYears < 5) return `${diffYears} lata temu`
  return `${diffYears} lat temu`
} 

export function sortScheduleByDay(schedule) {
  const dniTygodnia = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela"
  ];
  return [...schedule].sort(
    (a, b) => dniTygodnia.indexOf(a.dayOfWeek) - dniTygodnia.indexOf(b.dayOfWeek)
  );
}
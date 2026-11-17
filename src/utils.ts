import { type ClassValue, clsx } from "clsx"
import { addMinutes, differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInYears, format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Produces /service/<slug>-<uuid>. The service page reads the id from the last 36 chars,
// so the slug can be anything URL-safe.
export const createLinkFormat = (id: string, companyName: string): string => {
  const slug = companyName
    .toLocaleLowerCase("pl")
    .replaceAll("ł", "l")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics: ą→a, ś→s, ż→z...
    .replace(/[^a-z0-9]+/g, "-")     // anything else (spaces, &, /, ?) → "-"
    .replace(/^-+|-+$/g, "")

  return `/service/${slug ? `${slug}-` : ""}${id}`
}

export function displayAppointmentHours(appointmentStart: Date, appointmentDuration: number) {
  const end = addMinutes(appointmentStart, appointmentDuration)
  return `${format(appointmentStart, "H:mm")} - ${format(end, "H:mm")}`
}

export function displayAppointmentTime(duration: number) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  if (hours === 0) return `${minutes}min`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}min`
}

// Displays a readable phone number: +48 123 456 789
export function formatPhoneNumber(rawPhoneNumber: string) {
  const digits = String(rawPhoneNumber)
  return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`
}

export function checkImageType(uploadedFile: File): FormData | null {
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"]
  if (!validFileTypes.includes(uploadedFile.type)) return null

  const formData = new FormData()
  formData.append("image", uploadedFile)
  return formData
}

// Polish plural forms: 1 minuta, 2–4 minuty (except 12–14), 5+ minut
function pluralPl(n: number, one: string, few: string, many: string) {
  if (n === 1) return one
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

const ago = (n: number, one: string, few: string, many: string) =>
  `${n} ${pluralPl(n, one, few, many)} temu`

export function displayAddedTime(createdAt: Date) {
  const now = new Date()

  const diffSeconds = differenceInSeconds(now, createdAt)
  if (diffSeconds < 5) return "przed chwilą"
  if (diffSeconds < 60) return ago(diffSeconds, "sekunda", "sekundy", "sekund")

  const diffMinutes = differenceInMinutes(now, createdAt)
  if (diffMinutes < 60) return ago(diffMinutes, "minuta", "minuty", "minut")

  const diffHours = differenceInHours(now, createdAt)
  if (diffHours < 24) return ago(diffHours, "godzina", "godziny", "godzin")

  const diffDays = differenceInDays(now, createdAt)
  if (diffDays < 30) return diffDays === 1 ? "1 dzień temu" : `${diffDays} dni temu`

  const diffMonths = differenceInMonths(now, createdAt)
  if (diffMonths < 12) return ago(diffMonths, "miesiąc", "miesiące", "miesięcy")

  const diffYears = differenceInYears(now, createdAt)
  return ago(diffYears, "rok", "lata", "lat")
}

const DAYS_OF_WEEK = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
]

export function sortScheduleByDay<T extends { dayOfWeek: string }>(schedule: T[]): T[] {
  return [...schedule].sort(
    (a, b) => DAYS_OF_WEEK.indexOf(a.dayOfWeek) - DAYS_OF_WEEK.indexOf(b.dayOfWeek)
  )
}
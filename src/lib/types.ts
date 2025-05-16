// type for navbar profile menu
export type NavbarProfileProps = {
  name:string
  phone: string
  image:string | null
  role: string
}

//type for business cards on landing and search page
export type BusinessCardProps = {
  id: string
  name: string
  image: string
  category: string
  town:string
  district: string
  street: string
  reviews: { rate: number}[]
}

export type Client = {
  id: string
  name: string,
  image: string | null
}

export type Service = {
  id: string
  categoryId: string
  name: string
  description: string
  price: string,
  from: number
  to: number
  duration: number                            
  durationType: string                                
}

export type Review = {
  id: string
  content: string
  rate: number
  createdAt: Date
  client: Client
}

export type WorkingDay = {
  isOpen : boolean,
  dayOfWeek: string,
  open: string,
  close: string
}

export type Category = {
  id: string,
  name: string,
  services: Service[]
}

export type ServicePageTitleDataProps = {
  name: string
  category: string
  town: string
  zipcode: string
  district: string
  street: string
  reviews: Review[]
  workingDays: WorkingDay[]
}

export type BookingReservationData = {
  reservationStart: Date
  reservationEnd: Date
  duration: number
}

export type NewReservation = {
    businessId: string
    servicesIds: string[]
    reservationStart: Date 
    reservationYear: number
    reservationMonth: number
    reservationEnd: Date
    duration: number
    charge: number
    status: string
    clientName: string
    clientPhone: string
}

export type DashboardReservationListReservations = {
  charge: number
  duration: number
  reservationStart: Date
  status: string
  services: { service: {
    name: string}
  }[]
}

//DASHBOARD -> SERVICES
export type ServicesCategory ={
  id: string
  name: string
}

export type AddServiceModalProps = {
    name: string
    category: string
    price: string
    description: string
    durationType: string
    from: number
    to: number
    duration: number
}

//CALENDAR TYPES
export type CalendarWeekViewEventProps = {
  clientPhone: string | null
  clientName: string | null
  clientImage: string | null
  duration: number
  reservationStart: Date
  charge: number,
}

export type CalendarDayViewEventProps = {
  clientPhone: string | null
  clientName: string | null
  clientImage: string | null
  duration: number
  reservationStart: Date
  charge: number
}

// SETTINGS
// export type UserGalleryImage = {
//   id: string,
//   businessId: string,
//   photoUrl: string,
//   priority: number | null
// }


//ONBOARDING
export type OnboardingBusinessProps = {
    email: string
    password: string
    businessCategory: string
    businessName: string
    businessOwner: string
    businessPhone: number
    policyAcceptance: boolean
    businessTown: string
    businessZipcode: string
    businessDistrict: string
    businessStreet: string
    businessDescription: string
}
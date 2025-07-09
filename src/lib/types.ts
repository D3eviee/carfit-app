// type for navbar profile menu
export type NavbarProfileProps = {
  name?:string
  phone?: string
  image?:string | null
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

export type Service = {
  id: string
  categoryId: string
  name: string
  description: string
  price: string,
  duration: number                                                         
}

export type Review = {
  id: string
  title: string
  content: string
  rate: number
  createdAt: Date
  client: {
    name: string
  }
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
  phone: string
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
    clientMessage: string
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

export type AddService = {
    name: string
    category: string
    price: string
    description: string
    from: number
    to: number
    duration: number
}

//CALENDAR TYPES
export type CalendarDayViewEventProps = {
  clientPhone: string | null
  clientName: string | null
  clientImage: string | null
  duration: number
  reservationStart: Date
  charge: number
}

export type CalendarAppointmentOverviewProps = {
  appointmentId: string,
  status: string,
  clientPhone: string
  clientName: string
  clientImage: string
  duration: number
  reservationStart: Date
  charge: number
  service: {
    name: string
    price: string
  }[]
}

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


// USER APPOINTMENTS
export type AppointmentDetails = {
  id: string
  business: {
    name: string
    street: string
    district: string
    town: string
  },
  reservationStart: Date,
  duration: number,
  status: string,
  services: {
    serviceId: string,
    service: {
      name: string
      price: string
    } 
  }[] 
}
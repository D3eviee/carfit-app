import { create } from "zustand";
import { BusinessOnboardingSchema } from "./schema";
import { addMonths, subMonths } from "date-fns";
import { WorkingDay } from "./types";
import { ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';

export type BusinessOnboardingStore = Partial<BusinessOnboardingSchema> & {
    setBusinessOnboardingData: (data: Partial<BusinessOnboardingSchema>) => void;
    resetData: () => void
}

export const useBusinessOnboardingStore = create<BusinessOnboardingStore>()((set) => ({
    setBusinessOnboardingData: (data) => set(data),
    resetData: () => set({
      email: "",
      password: "",
      repeatedPassword: "",
      businessCategory: "",
      businessName: "",
      businessOwner: "",
      businessPhone: "",
      businessTown: "",
      businessZipcode: "",
      businessDistrict: "",
      businessStreet: "",
      businessDescription: ""
    })
}))

interface WorkingDaysStore {
    days: WorkingDay[];
    updateIsOpen: (dayName: string, value: boolean) => void;
    updateWorkingHours: (dayName: string, open: string, close:string) => void
}

export const useWorkingDays = create<WorkingDaysStore>()((set) => ({
    days: [
      { isOpen: true, dayOfWeek: "Poniedziałek", open: "07:00", close: "18:00" },
      { isOpen: true, dayOfWeek: "Wtorek", open: "07:00", close: "18:00" },
      { isOpen: true, dayOfWeek: "Środa", open: "07:00", close: "18:00" },
      { isOpen: true, dayOfWeek: "Czwartek", open: "07:00", close: "18:00" },
      { isOpen: true, dayOfWeek: "Piątek", open: "07:00", close: "18:00" },
      { isOpen: false, dayOfWeek: "Sobota", open: "07:00", close: "18:00" },
      { isOpen: false, dayOfWeek: "Niedziela", open: "07:00", close: "18:00" }
    ],
  
    updateIsOpen: (dayName, value) =>
      set((state) => ({
        days: state.days.map((day) =>
          day.dayOfWeek === dayName ? {...day, isOpen: value} : day
        ),
    })),

    updateWorkingHours: (dayName, open, close) => {
      set((state) => ({ days: state.days.map((day) =>  day.dayOfWeek === dayName ? {...day, close: close, open: open} : day )}))
    }
}))
  

type CalendarStoreProps = {
  todayDate: Date
  activeDate: Date
  selectedDate: Date | null
  setSelectedDate: (day:Date) => void
  setNextActiveMonth: (date: Date) => void
  setPreviousActiveMonth: (date: Date) => void
  resetCalendarStore: () => void
}

export const useCalendarStore = create<CalendarStoreProps>((set) => ({
  todayDate: new Date(),
  activeDate: new Date(),
  selectedDate: new Date(),
  setSelectedDate : (day) => set(()=>({selectedDate : day})),
  setNextActiveMonth: (date) => set(()=>({activeDate : addMonths(date, 1), selectedDate:null})),
  setPreviousActiveMonth: (date) => set(()=>({activeDate : subMonths(date, 1), selectedDate: null})),
  resetCalendarStore: () => set(({activeDate : new Date(), selectedDate: new Date()}))
}));

// Booking appointmentState
type AppointmentStoreProps = {
  clientMessage: string | null
  clientCar: string | null
  appointmentTime: Date | null
  selectedServices: string[]
  setAppointmentTime: (time:Date | null) => void
  setClientMessage: (text: string) => void
  setClientCar: (text: string) => void
  toggleSelectedService: (serviceId) => void
  resetSelectedServices: () => void
  resetAppointmentTime: () => void
  resetClientMessage: () => void
}

export const useAppointmentStore = create<AppointmentStoreProps>((set) => ({
  selectedServices: [],
  clientMessage: "",
  clientCar: "", 
  appointmentTime: null,
  toggleSelectedService: (serviceId) => set((state) => {
    const isSelected = state.selectedServices.includes(serviceId);
    
    return {
      selectedServices: isSelected
        ? state.selectedServices.filter((id) => id !== serviceId) // delete if already selected
        : [...state.selectedServices, serviceId], // add if not selected
    }}
  ),
  resetSelectedServices: () => set(()=>({selectedServices : []})),
  setAppointmentTime : (time) => set(()=>({appointmentTime : time})),
  setClientCar : (car) => set(()=>({clientCar : car})),
  setClientMessage: (text) => set(() => ({clientMessage: text})),
  resetAppointmentTime: () => set(() => ({appointmentTime: null})),
  resetClientMessage: () => set(() => ({clientMessage: null}))
}))

//REFACTORED
// store for desktop type of calendar
type DashboardCalendarTypeStore = {
  calendarType: string,
  setCalendarType: (calendarType:string) => void
}

export const useBusinessCalendarNavigationStore = create<DashboardCalendarTypeStore>((set) => ({
  calendarType: "week",
  setCalendarType : (selectedCalendarType) => set(()=>({calendarType : selectedCalendarType})),
}));

//REFACTORED
// store for mobile type of calendar
type DashboardMobileCalendarTypeStore = {
  mobileCalendarType: string,
  setMobileCalendarType: (calendarType:string) => void
}

export const useDashboardMobileCalendarTypeStore = create<DashboardMobileCalendarTypeStore>((set) => ({
  mobileCalendarType: "list",
  setMobileCalendarType : (selectedCalendarType) => set(()=>({mobileCalendarType : selectedCalendarType})),
}));


type BusinessSmallCallendarStore = {
  activeDay : Date
  setActiveDay: (day:Date) => void
}

export const useBusinessSmallCallendarStore = create<BusinessSmallCallendarStore>((set) => ({
  activeDay: new Date(),
  setActiveDay : (day) => set(()=>({activeDay : day})),
}));

type EditDay = {
  isOpen: boolean
  open: string
  close: string
  dayOfWeek: string
}
interface UseSettingsEditingWorkingHoursStore {
  days: EditDay[];
  setDays: (days: EditDay[]) => void
  toggleIsOpen: (dayName: string) => void;
  updateOpenHour: (dayName: string, value: string) => void;
  updateCloseHour: (dayName: string, value: string) => void;
}

export const useSettingsEditingWorkingHours = create<UseSettingsEditingWorkingHoursStore>()((set) => ({
  days: [],

  setDays: (days) => set(() => ({ days })),

  toggleIsOpen: (dayName) =>
    set((state) => ({
      days: state.days.map((day) =>
        day.dayOfWeek === dayName ? {...day, isOpen: !day.isOpen} : day
      ),
  })),

  updateOpenHour: (dayName, value) =>
      set((state) => ({
        days: state.days.map((day) =>
          day.dayOfWeek === dayName ? {...day, open: value} : day
        ),
  })),

  updateCloseHour: (dayName, value) =>
      set((state) => ({
        days: state.days.map((day) =>
          day.dayOfWeek === dayName ? {...day, close: value} : day
        ),
  })),
}));

// MODAL STORE
type ModalState = {
  stack: ReactNode[];
  openModal: (element:ReactNode) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  stack: [],
  openModal: (element) => {
    document.body.style.overflow = "hidden"
    set((state) => ({ stack: [...state.stack, element] }))
  },
  closeModal: () =>{
    const currentStackSize = get().stack.length;
    set((state) => ({ stack: state.stack.slice(0, -1) }))
    if(currentStackSize == 1) document.body.style.overflow = ""
  }
}));


// TOAST STORE
type ToastType = "success" | "error" | "info" | "warning";
type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastStore = {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: (message, type = "info") => {
    const id = uuidv4();
    const newToast = { id, message, type };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Remove after 4s
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },
  
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))


// MOBILE NAVIGATION STORE
type MobileNavigationStore = {
  menu: ReactNode;
  openMenu: (element:ReactNode) => void;
  closeMenu: () => void;
};

export const useMobileNavigationStore = create<MobileNavigationStore>((set) => ({
  menu:null,
  openMenu: (element) => {
    document.body.style.overflow = "hidden"
    set(() => ({ menu: element }))
  },
  closeMenu: () =>{
    set(() => ({ menu: null }))
    document.body.style.overflow = ""
  }
}))

// DASHBOARD SIDEBAR
type DashboardSidebar = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const useDashboardSidebar = create<DashboardSidebar>((set) => ({
  isMenuOpen: true,
  toggleMenu: () => { set((store) => ({ isMenuOpen: !store.isMenuOpen }))}
}))


// DASHBOARD LISTINGS
type Offering = {
  id: string
  createdAt: Date
  status: string
  title: string
  category: string
  description: string
  brand: string
  model: string
  town: string
  district: string
  clientName: string
  clientPhone: string
  offerId: string | null
  offerDescription: string | null
}

type SelectedListing = {
  toggleIsEditing: () => void
  isEditing: boolean
  activeOffering: Offering
  markActiveOffering: (activeOffering: Offering) => void
  updateOffering: (offer: string) => void
}

export const useActiveListingStore = create<SelectedListing>((set) => ({
  activeOffering: {
    id: "",
    createdAt: new Date(),
    status: "",
    title: "",
    category: "",
    description: "",
    brand: "",
    model: "",
    town: "",
    district: "",
    clientName: "",
    clientPhone: "",
    offerId: null,
    offerDescription: null
  },
  markActiveOffering: (activeOffering) => set(() => ({ activeOffering })),
  updateOffering: (offer) => set((state) => ({ activeOffering: { ...state.activeOffering, offerDescription: offer} })),
  isEditing: false,
  toggleIsEditing: () => set((state) => ({ isEditing: !state.isEditing }))
}))

type EditReview = {
  isEditing: boolean
  toggleIsEditing ;
  
}
export const useEditReviewStore = create<EditReview>((set) => ({
  isEditing: false,
  toggleIsEditing: () => set((state) => ({ isEditing: !state.isEditing }))
}))
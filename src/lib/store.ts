import { create } from "zustand";
import { BusinessOnboardingSchema } from "./schema";
import { addMonths, subMonths } from "date-fns";
import { Service, WorkingDay } from "./types";

export type OnboardingState = Partial<BusinessOnboardingSchema> & {
    setData: (data: Partial<BusinessOnboardingSchema>) => void;
    resetData: () => void
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
    setData: (data) => set(data),
    resetData: () => set({
      email: "",
      password: "",
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
    updateOpenHour: (dayName: string, value: string) => void;
    updateCloseHour: (dayName: string, value: string) => void;
}

const useWorkingDays = create<WorkingDaysStore>()((set) => ({
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
  
export default useWorkingDays;


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
  appointmentTime: Date | null
  selectedServices: string[]
  setAppointmentTime: (time:Date | null) => void
  setClientMessage: (text: string) => void
  toggleSelectedService: (serviceId) => void
  resetSelectedServices: () => void
  resetAppointmentTime: () => void
  resetClientMessage: () => void
}

export const useAppointmentStore = create<AppointmentStoreProps>((set) => ({
  selectedServices: [],
  clientMessage: "",
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
  id: string
  updatedAt: Date
  serviceId: string
  dayOfWeek: string
}
interface UseSettingsEditingWorkingHoursStore {
  days: EditDay[];
  setInDays: (days: EditDay[]) => void
  updateIsOpen: (dayName: string, value: boolean) => void;
  updateOpenHour: (dayName: string, value: string) => void;
  updateCloseHour: (dayName: string, value: string) => void;
}

export const useSettingsEditingWorkingHours = create<UseSettingsEditingWorkingHoursStore>()((set) => ({
  days: [],

  setInDays: (days) => set(() => ({ days })),

  updateIsOpen: (dayName, value) =>
    set((state) => ({
      days: state.days.map((day) =>
        day.dayOfWeek === dayName ? {...day, isOpen: value} : day
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

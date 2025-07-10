'use client'
import {eachDayOfInterval, format, getDaysInMonth, getISODay, getMonth, isSameMonth, isSameYear, lastDayOfMonth, startOfMonth } from "date-fns"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookingCalendarDay } from "./booking-calendar-day";
import { useAppointmentStore, useCalendarStore } from "@/lib/store";
import { cn, useServiceIdFromParams } from "@/utils";
import { BookingAppointmentAvailableHours } from "./booking-calendar-available-hours";
import { useQuery } from "@tanstack/react-query";
import { getActiveMonthAppointments, getBusinessWorkingHours } from "@/app/(landing)/actions";
import { Service } from "@/lib/types";
import { Spinner } from "../spinner";
import { Error } from "../error";
import { pl } from "date-fns/locale";

export const BookingCalendar = ({servicesData}:{servicesData:Service[]}) => {
    const businessId = useServiceIdFromParams()
    const namesOfDays = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"]

    //ZUSTAND STORE
    const todayDate = useCalendarStore((store) => store.todayDate)
    const activeDate = useCalendarStore((store) => store.activeDate)
    const selcetedDate = useCalendarStore((store) => store.selectedDate) //SELECTED CALENDAR DAY
    const setAppointmentTime = useAppointmentStore(store => store.setAppointmentTime)
    const setNextActiveMonth = useCalendarStore((store) => store.setNextActiveMonth)
    const setPreviousActiveMonth = useCalendarStore((store) => store.setPreviousActiveMonth)

    // DATA FOR DISPLAYIG SELECTED DATE
    const rawDayOfWeek = format(selcetedDate, "EEEE", {locale: pl})
    const dayOfWeek = rawDayOfWeek.slice(0,1).toUpperCase() + rawDayOfWeek.slice(1)
    const day = format(selcetedDate, "d")
    const rawMonth = format(selcetedDate, "LLLL", {locale: pl})
    const month = rawMonth.slice(0,1).toUpperCase() + rawMonth.slice(1)
    const year = format(selcetedDate, "y")
    const date = `${dayOfWeek}, ${day} ${month} ${year} `


    // FORMATING DATE DATA FOR CALENDAR
    const activeMonth = getMonth(activeDate)
    const activeYear = activeDate.getFullYear()
    const daysInMonthActiveMonth = getDaysInMonth(activeDate)
    const firstDayOfCurrentMonth = getISODay(startOfMonth(activeDate))
    const lastDayOfTheCurrentMonth = getISODay(lastDayOfMonth(activeDate))

    const daysOfActiveMonth = eachDayOfInterval({
        start: new Date(activeYear, activeMonth, 1),
        end: new Date(activeYear, activeMonth, daysInMonthActiveMonth)
    })

    const {data: getActiveMonthAppointmentsData, status: getActiveMonthAppointmentsStatus} = useQuery({
        queryKey: ["getActiveMonthAppointments", activeDate],
        queryFn: async () => {
            const response = await getActiveMonthAppointments(activeDate, businessId)
            if (response.success) return response.data
        },
        enabled: !!businessId
    })

    const { data: businessWorkingHoursData, status: businessWorkingHoursStatus} = useQuery({
        queryKey: ["getWorkingHours"],
        queryFn: async () => {
            const response = await getBusinessWorkingHours(businessId)
            if(response.success) return response.data
        },
        enabled: !!businessId
    });

    const isPreviousMonthDisabled = () => {
        if(isSameMonth(todayDate, activeDate) && isSameYear(todayDate, activeDate)) return true
        else return  false
    }
    
    const handlePreviousMonth = () => {
        setPreviousActiveMonth(activeDate)
        setAppointmentTime(null)
    }

    const handleNextMonth = () => {
        setNextActiveMonth(activeDate)
        setAppointmentTime(null)
    }

    if(getActiveMonthAppointmentsStatus == "pending") return <Spinner/>
    if(getActiveMonthAppointmentsStatus == "error") return <Error/>
    if(businessWorkingHoursStatus == "pending") return <Spinner/>
    if(businessWorkingHoursStatus == "error") return <Error/>

    return (
        <div className="h-screen w-full flex flex-col gap-5 overflow-hidden">
            <h1 className="text-[#191919] text-2xl leading-none font-semibold">Wybierz termin</h1>

            {/* CALENDAR HEADING AND CONTROLS */}
            <div className="flex flex-row justify-between items-center ">
                <h1 className="text-black text-md font-medium tracking-normal">{`${month}, ${activeYear}`}</h1> 
                <div className="flex flex-row gap-3" >
                    <button 
                        className={cn("p-1 bg-black rounded-md hover:bg-[#222]", isPreviousMonthDisabled() && "bg-[#333] hover:bg-[#333]")}
                        disabled={isPreviousMonthDisabled()}
                        onClick={handlePreviousMonth}
                    >
                        <ChevronLeft size={23} color="#FFF"/>
                    </button>
                    <button className="p-1 bg-black rounded-md hover:bg-[#222]" onClick={handleNextMonth}>
                        <ChevronRight size={23} color="#FFF"/>
                    </button>
                </div>
            </div>
                
            {/* CALENDAR */}
            <div className="flex flex-col w-full">
                {/* DAYS NAMES */}
                <div className="w-full grid grid-cols-7">
                    {namesOfDays.map((day, i ) => <div key={i} className="text-xs text-center pb-0.5">{day}</div>) }
                </div>

                {/* DAYS FOR SELECTING */}
                <div className="w-full grid grid-cols-7">
                    {Array.from({ length: firstDayOfCurrentMonth-1 }, (_, i) => i + 1).map((_ ,i) => (
                        <div key={i} className="flex justify-center text-center py-0.5 my-0.5"></div>
                    ))}

                    {daysOfActiveMonth.map((day, index) => (
                        <BookingCalendarDay key={index} date={day}/>
                    ))}

                    {Array.from({ length: 7 - lastDayOfTheCurrentMonth }, (_, i) => i + 1).map((_ ,i) => (
                        <div key={i} className="flex justify-center text-center py-0.5 my-0.5"></div>
                    ))}
                </div>
             </div>

            {/* AVAILABLE HOURS */}
            <div className="w-full h-full flex flex-col gap-3 overflow-scroll">
                <h2 className="text-base font-medium text-[#191919]">{date}</h2>
                
                {selcetedDate && 
                    <BookingAppointmentAvailableHours
                        services={servicesData} 
                        reservations={getActiveMonthAppointmentsData}
                        workingHours={businessWorkingHoursData}
                    /> 
                }
            </div>
        </div>
    )
} 
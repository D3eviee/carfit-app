'use client'
import {eachDayOfInterval, format, getDate, getDaysInMonth, getISODay, getMonth, getYear, lastDayOfMonth, subMonths } from "date-fns"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookingCalendarDay } from "./booking-calendar-day";
import { useCalendarStore, useEventTimeStore } from "@/lib/store";
import { cn, useServiceIdFromParams } from "@/utils";
import { BookingEventTime } from "./booking-event-time";
import { useQuery } from "@tanstack/react-query";
import { getActiveMonthAppointments, getBusinessWorkingHours } from "@/app/(landing)/actions";
import { Service } from "@/lib/types";
import { Spinner } from "../spinner";
import { Error } from "../error";

export const BookingCalendar = ({servicesData}:{servicesData:Service[]}) => {
    const serviceId = useServiceIdFromParams()

    //ZUSTAND STORE
    const todayDate = useCalendarStore((store) => store.todayDate)
    const activeDate = useCalendarStore((store) => store.activeDate)
    const selcetedDate = useCalendarStore((store) => store.selectedDate) //SELECTED CALENDAR DAY
    const setActiveEventTime = useEventTimeStore(store => store.setActiveEventTime)
    const setNextActiveMonth = useCalendarStore((store) => store.setNextActiveMonth)
    const setPreviousActiveMonth = useCalendarStore((store) => store.setPreviousActiveMonth)

    const activeMonth = getMonth(activeDate)
    const activeYear = activeDate.getFullYear()
    const daysInMonthActiveMonth = getDaysInMonth(activeDate)

    const firstDayOfCurrentMonth = getISODay(new Date(activeYear, activeMonth))
    const lastDayOfTheCurrentMonth = getISODay(lastDayOfMonth(activeDate))

    const numberOfDaysInPreviousMonth = getDate(lastDayOfMonth(subMonths(activeDate, 1)))
    
    const daysOfActiveMonth = eachDayOfInterval({
        start: new Date(activeYear, activeMonth, 1),
        end: new Date(activeYear, activeMonth, daysInMonthActiveMonth)
    })

    const {data: getActiveMonthAppointmentsData, status: getActiveMonthAppointmentsStatus} = useQuery({
        queryKey: ["getActiveMonthAppointments", activeDate],
        queryFn: async () => {
            const response = await getActiveMonthAppointments(activeDate, serviceId)
            return response
        }
    })

    const isPreviousMonthDisabled = () => {
        if(getYear(todayDate) == getYear(activeDate) && getMonth(todayDate) == getMonth(activeDate)) return true
        else return  false
    }
    
    const handlePreviousMonth = () => {
        setPreviousActiveMonth(activeDate)
        setActiveEventTime(null)
    }

    const handleNextMonth = () => {
        setNextActiveMonth(activeDate)
        setActiveEventTime(null)
    }

    const { data: businessWorkingHoursData, status: businessWorkingHoursStatus} = useQuery({
            queryKey: ["getWorkingHours"],
            queryFn: async () => {
              const response = await getBusinessWorkingHours(serviceId)
              return response
            },
        });

    if(getActiveMonthAppointmentsStatus == "pending") return <Spinner/>
    if(getActiveMonthAppointmentsStatus == "error") return <Error/>

    if(businessWorkingHoursStatus == "pending") return <Spinner/>
    if(businessWorkingHoursStatus == "error") return <Error/>


    return (
        <div className="w-full flex flex-col gap-8 lg:w-7/12">
            {/* CALENDAR HEADING AND CONTROLS */}
            <div className=" flex flex-row justify-between items-center">
                <h1 className="text-black text-xl font-medium tracking-normal">{`${format(activeDate, "MMMM")}, ${activeYear}`}</h1> 
                <div className="flex flex-row gap-3" >
                    <button 
                        className={cn("p-1 bg-black rounded-md hover:bg-[#222]", isPreviousMonthDisabled() && "bg-[#333] hover:bg-[#333]")}
                        disabled={isPreviousMonthDisabled()}
                        onClick={handlePreviousMonth}
                    >
                        <ChevronLeft color="#FFF"/>
                    </button>
                    <button className="p-1 bg-black rounded-md hover:bg-[#222]" onClick={handleNextMonth}>
                        <ChevronRight color="#FFF"/>
                    </button>
                </div>
            </div>
                
            {/* CALENDAR */}
            <div className="flex flex-col min-h-[335px] lg:min-h-[375px]">
                {/* CALENDAR DAYS */}
                <div className="w-full grid grid-cols-7">
                    <div className="text-center py-1">Mon</div>
                    <div className="text-center py-1">Tue</div>
                    <div className="text-center py-1">Wed</div>
                    <div className="text-center py-1">Thu</div>
                    <div className="text-center py-1">Fri</div>
                    <div className="text-center py-1">Sat</div>
                    <div className="text-center py-1">Sun</div>
                </div>

                <div className="w-full grid grid-cols-7">
                {Array.from({ length: firstDayOfCurrentMonth-1 }, (_, i) => i + 1).map((_ ,i) => (
                    <div key={i} className="flex justify-center text-center py-1 my-1">
                        <p className="w-10 h-10 flex items-center justify-center rounded-md text-base text-[#ACACAC] font-normal">
                            {numberOfDaysInPreviousMonth-i}
                        </p>
                    </div>
                )).reverse()}

                {daysOfActiveMonth.map((day, index) => (
                    <BookingCalendarDay key={index} date={day}/>
                ))}

                {Array.from({ length: 7 - lastDayOfTheCurrentMonth }, (_, i) => i + 1).map((_ ,i) => (
                    <div key={i} className="flex justify-center text-center py-1 my-1">
                        <p className="w-10 h-10 flex items-center justify-center rounded-md text-base text-[#ACACAC] font-normal">
                            {i+1}
                        </p>
                    </div>
                ))}
                </div>
            </div>
            {/* {AVAILABLE DATES} */}

            <div className="flex flex-col  gap-3 md:gap-7">
                {
                    selcetedDate != undefined && 
                    <h2 className="text-base text-black font-semibold ">
                        {`${format(selcetedDate, "EEEE")}, ${format(selcetedDate, "do")} ${format(selcetedDate, "MMMM")} ${format(selcetedDate, "y") }`}
                    </h2>
                }
                
                {/* LIST OF AVAILABLE HOURS*/}
                {getActiveMonthAppointmentsData && selcetedDate ? 
                    <BookingEventTime 
                        services={servicesData} 
                        reservations={getActiveMonthAppointmentsData.data!}
                        workingHours={businessWorkingHoursData.data!}
                    /> : null}
            </div>
        </div>
    )
} 
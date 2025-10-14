'use client'
import { FormError } from "@/components/forms/form-error";
import { DashboardCalendarModalLabel } from "@/components/modals/dashboard/calendar/dashboard-calendar-modal-label";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

type DashboardCalendarModalDateSelectProps = {
  register: UseFormRegister<AddNewAppointmentManual>
  error: string
}

export const DashboardCalendarModalDateSelect = ({register, error}:DashboardCalendarModalDateSelectProps) => {
  return (
    <div className="w-1/3 flex flex-col gap-2">
      <DashboardCalendarModalLabel htmlFor="date" labelText="Dzień wizyty"/>
      <input 
        type="date" 
        id="date" 
        {...register('date')} 
        required 
        className="w-full bg-[#F6F7FB] px-2 py-2.5 text-sm text-main-black rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]"
      />
      <FormError error={error}/>
    </div>
  )
}


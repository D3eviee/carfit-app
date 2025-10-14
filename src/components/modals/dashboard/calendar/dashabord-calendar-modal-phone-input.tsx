'use client'
import { FormError } from "@/components/forms/form-error";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";
import { DashboardCalendarModalLabel } from "./dashboard-calendar-modal-label";
import { DashboardCalendarModalInput } from "./dashboard-calendar-modal-input";

type DashboardCalendarModalPhoneInputProps = {
  register: UseFormRegister<AddNewAppointmentManual> 
  error:string
}

export const DashboardCalendarModalPhoneInput = ({ register, error }:DashboardCalendarModalPhoneInputProps) => {
  return (
    <div className="w-4/5 flex flex-col gap-2">
      <DashboardCalendarModalLabel htmlFor="clientPhone" labelText="Numer telefonu"/>
      <DashboardCalendarModalInput type="text" id="clientPhone" {...register("clientPhone")}/> 
      <FormError error={error}/>  
    </div>
  )
}
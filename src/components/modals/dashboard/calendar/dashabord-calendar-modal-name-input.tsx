'use client'
import { FormError } from "@/components/forms/form-error";
import { DashboardCalendarModalInput } from "@/components/modals/dashboard/calendar/dashboard-calendar-modal-input";
import { DashboardCalendarModalLabel } from "@/components/modals/dashboard/calendar/dashboard-calendar-modal-label";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

type DashboardCalendarModalNameInputProps = {
  register: UseFormRegister<AddNewAppointmentManual>
  error:string
}

export const DashboardCalendarModalNameInput = ({ register, error }:DashboardCalendarModalNameInputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <DashboardCalendarModalLabel htmlFor="clientName" labelText="Imię i nazwisko"/>
      <DashboardCalendarModalInput type="text" id="clientName" {...register("clientName")}/>
      <FormError error={error}/>  
    </div>
  )
}


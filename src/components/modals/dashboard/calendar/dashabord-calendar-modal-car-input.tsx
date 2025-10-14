'use client'
import { FormError } from "@/components/forms/form-error";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";
import { DashboardCalendarModalLabel } from "./dashboard-calendar-modal-label";
import { DashboardCalendarModalInput } from "./dashboard-calendar-modal-input";

type DashboardCalendarModalCarInputProps = {
  register: UseFormRegister<AddNewAppointmentManual> 
  error:string
}

export const DashboardCalendarModalCarInput = ({ register, error }:DashboardCalendarModalCarInputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <DashboardCalendarModalLabel htmlFor="clientCar" labelText="Pojazd"/>
      <DashboardCalendarModalInput type="text" id="clientCar" {...register("clientCar")}/> 
      <FormError error={error}/>  
    </div>
  )
}
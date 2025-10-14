'use client'
import { FormError } from "@/components/forms/form-error";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";
import { DashboardCalendarModalLabel } from "./dashboard-calendar-modal-label";
import TextareaAutosize from "react-textarea-autosize"

type DashboardCalendarModalDescriptionInputProps = {
  register: UseFormRegister<AddNewAppointmentManual> 
  error:string
}

export const DashboardCalendarModalDescriptionInput = ({ register, error }:DashboardCalendarModalDescriptionInputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <DashboardCalendarModalLabel htmlFor="description" labelText="Dodatkowe informacje"/>
      <TextareaAutosize
        minRows={1}
        maxRows={3}
        className="w-full bg-[#F6F7FB] px-2 py-2.5 text-sm text-main-black rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]"
        {...register("description")}
      />
      <FormError error={error}/>  
    </div>
  )
}
'use client'
import { FormError } from "@/components/forms/form-error";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";
import { DashboardCalendarModalLabel } from "./dashboard-calendar-modal-label";

type DashboardCalendarModalCategorySelectProps = {
  businessCategoriesData:{
    id: string
    name: string
    services: {
      id: string
      name: string
      duration: number
      price: string
      description: string
    }[]
  }[]
  register: UseFormRegister<AddNewAppointmentManual>
  error:string
}

export const DashboardCalendarModalCategorySelect = ({businessCategoriesData, register, error}:DashboardCalendarModalCategorySelectProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <DashboardCalendarModalLabel htmlFor="category" labelText="Kategoria"/>
      <select 
        className="w-full bg-[#F6F7FB] px-2 py-2.5 text-sm text-main-black rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]"
        id="category" 
        {...register('category')} 
      >
        <option key="0" value="select" disabled>Wybierz</option>
        {businessCategoriesData?.map((category)=> <option key={category.id} value={category.id}>{category.name}</option> )}
      </select>

      <FormError error={error}/>    
    </div>
  )
}


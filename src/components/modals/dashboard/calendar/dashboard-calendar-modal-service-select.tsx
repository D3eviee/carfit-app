'use client'
import { FormError } from "@/components/forms/form-error";
import { DashboardCalendarModalLabel } from "@/components/modals/dashboard/calendar/dashboard-calendar-modal-label";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

type DashboardCalendarModalServiceSelectProps = {
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
  selectedCategory: string
  error: string
}

export const DashboardCalendarModalServiceSelect = ({businessCategoriesData, register, selectedCategory, error}:DashboardCalendarModalServiceSelectProps) => {
  return (
    <div className="flex flex-col gap-2">
     <DashboardCalendarModalLabel htmlFor="service" labelText="Usługa"/>
      <select 
        className="w-full bg-[#F6F7FB] px-2 py-2.5 text-sm text-main-black rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]"
        id="service" 
        {...register('service')}
      >
        <option value="select" disabled>Wybierz</option>
        {selectedCategory && businessCategoriesData?.map((category)=> (
          selectedCategory == category.id && category.services.map((service) => 
          <option className="flex flex-row justify-between" key={service.id} value={service.id}>{service.name}</option>
          )))}
      </select>
      <FormError error={error}/>
    </div>
  )
}


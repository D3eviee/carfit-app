'use client'
import { useForm } from "react-hook-form";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { DashboardCalendarModalCategorySelect } from "./dashboard-calendar-modal-category-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewAppointmentManual, addNewAppointmentManualSchema } from "@/lib/schema";
import { DashboardCalendarModalServiceSelect } from "./dashboard-calendar-modal-service-select";
import { DashboardCalendarModalDateSelect } from "./dashabord-calendar-modal-date-select";
import { DashboardCalendarModalTimeSelect } from "./dashabord-calendar-modal-time-select";
import { DashboardCalendarModalNameInput } from "./dashabord-calendar-modal-name-input";
import { DashboardCalendarModalPhoneInput } from "./dashabord-calendar-modal-phone-input";
import { useBusienessServices } from "@/lib/hooks/useBusinessServices";
import { useBusienessWorkingHours } from "@/lib/hooks/useBusinessWorkingHours";
import { ExitModalButton } from "../../exit-modal-button";
import { useAddNewAppointmentManually } from "@/lib/hooks/dashboard/useAddNewAppointmentManully";
import { DashboardCalendarModalCarInput } from "./dashabord-calendar-modal-car-input";
import { DashboardCalendarModalDescriptionInput } from "./dashabord-calendar-modal-description-input";

export const DashboardCalendarAddAppointmetModal = () => {
  const { register, handleSubmit, watch, formState} = useForm<AddNewAppointmentManual>({
    resolver: zodResolver(addNewAppointmentManualSchema),
    defaultValues: {
      category: "",
      service: "",
      time: "",
      date: new Date().toISOString().split("T")[0],
      clientName: "",
      clientPhone: "",
      clientCar: "",
      description: ""
    }
  }) 
  
  // STATES FOR RENDERING RELATABLE VALUES
  const selectedCategory = watch("category", "select")
  const selectedService = watch("service",  "select")
  const selectedDate = watch("date", new Date().toISOString().split("T")[0])

  // ADDING APPOINTMENT FUNCTION
  const {mutate, isPending} = useAddNewAppointmentManually()
  const handleAddingAppointment = (data: AddNewAppointmentManual ) => {
    const appointmentData = {
      servicesIds: [data.service],
      reservationStart: new Date(data.time),
      duration: Number(selectedServiceData.duration),
      charge: Number(selectedServiceData.price),
      clientName: (data.clientName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")).trim(), 
      clientPhone: data.clientPhone.trim().replace(/\s+/g, ""),
      clientCar: data.clientCar,
      description: data.description
    }
    mutate(appointmentData)
  }

  //GETTING SERVICES AND WORKING HOURS DATA FOR SELECTS
  const { data: servicesData, status: businessCategoriesStatus} = useBusienessServices()
  const { data: workingHoursData, status: workingDaysDataStatus } = useBusienessWorkingHours()
  if(workingDaysDataStatus === "pending") return <Spinner/>
  if(workingDaysDataStatus === "error") return <Error/>
  if(businessCategoriesStatus == "pending") return <Spinner/>
  if(businessCategoriesStatus == "error") return <Error/>

  const selectedServiceData = servicesData && servicesData
    .find((category) => category.id === selectedCategory)
    ?.services.find((service) => service.id === selectedService)

  return (
    <form 
      onSubmit={handleSubmit(handleAddingAppointment)}
      className="w-[700px] flex flex-col gap-4 p-8 bg-white ring-1 ring-white inset-shadow-white rounded-4xl text-black space-y-5"
    >
      <div className="text-sm text-center text-main-black font-medium">Nowa wizyta</div>
      {/* CATEGORY SELECT */}
      <DashboardCalendarModalCategorySelect register={register} businessCategoriesData={servicesData} error={formState.errors.category?.message} />

      {/* SERVICE SELECT */}
      <DashboardCalendarModalServiceSelect register={register} businessCategoriesData={servicesData} selectedCategory={selectedCategory} error={formState.errors.service?.message} />
      
      {/* DATE AND HOUR */}
      <div className="w-full flex flex-row gap-6">
        <DashboardCalendarModalDateSelect register={register} error={formState.errors.date?.message} />

        {(selectedDate && selectedService && selectedServiceData) &&  
          <DashboardCalendarModalTimeSelect 
            selectedDate={selectedDate}
            workingHoursData={workingHoursData}
            register={register}
            selectedServiceDuration={selectedServiceData.duration}
            error={formState.errors.time?.message}
          />
        }
      </div>

      {/* CLIENT PHONE AND NAME */}
      <div className="flex flex-row gap-6">
        <DashboardCalendarModalNameInput register={register} error={formState.errors.clientName?.message} />
        <DashboardCalendarModalPhoneInput register={register} error={formState.errors.clientPhone?.message} />
      </div>

      {/* CLIENT VEHICLE */}
      <DashboardCalendarModalCarInput register={register} error={formState.errors.clientCar?.message} />

      {/* ADDICTIONAL INFORMATION */}
      <DashboardCalendarModalDescriptionInput register={register} error={formState.errors.description?.message} />
      
      {/* ACTION BUTTONS */}
      <div className="w-full flex flex-row gap-6">
        <ExitModalButton/>
        <button 
          type="submit"
          className="w-full text-center justify-center py-2.5 bg-main-black rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#333] active:scale-xs transition duration-75"
        >
          { isPending ?  <Spinner color="#FFF"/> : <p className="text-white">Dodaj wizytę</p> }
        </button>
      </div>
    </form>
  )
}
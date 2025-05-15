'use client'
import ModalProvider from "@/components/providers/modal-provider";
import { useForm } from "react-hook-form";
import { FormLabel } from "@/components/form-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewReservationManually, getActiveMonthAppointments } from "@/app/dashboard/actions";
import { getWorkingTimeData } from "@/actions/actions";
import { addMinutes, eachMinuteOfInterval, format, getMonth, getYear, set } from "date-fns";
import { getServicesForBusiness } from "@/app/dashboard/services/actions";

type ModalProps = {
    open: boolean
    onClose: () => void;
}

export default function CalendarAddApppointmentModal({open, onClose}:ModalProps) {
  //FORM STATE
  const { register, handleSubmit, watch, getValues} = useForm({
    defaultValues: {
      category: "select",
      service: "select",
      time: "",
      date: new Date().toISOString().split("T")[0],
      clientName: "",
      clientPhone: ""
    }
  })  

  //GETTING SERVICES FOR SELECT - SERVICES AND CATEGORIES
  const { data: businessCategoriesData, status: businessCategoriesStatus} = useQuery({
    queryKey: ["addAppointmetnManuallyServices"],
    queryFn: async () => {
      const response =  await getServicesForBusiness()
      if(!response.success) return null
      return response.data
    } 
  }); 

  //GETTING SERVICE WORKING DAYS DATA
  const { data: workingDaysData, status: workingDaysDataStatus } = useQuery({
    queryKey: ["workingDaysData"],
    queryFn: async () => {
      const response =  await getWorkingTimeData()
      if(!response.success) return null
      return response.data
    } 
  }); 

  //STATES FOR RENDERING RELATABLE VALUES
  const selectedCategory = watch("category", "select")
  const selectedService = watch("service",  "select")
  const selectedDate = watch("date", new Date().toISOString().split("T")[0])

  const { data: appointments, status: appointmentsStatus} = useQuery({
    queryKey: ["appointmentsData"],
    queryFn: async () => {
      const response =  await getActiveMonthAppointments(new Date(selectedDate))
      if(!response.success) return null
      return response.data
    } 
  })

  //GETTING DATA OF SELECTED SERVICE
  const selectedServiceData = businessCategoriesData?.find((category) => category.id === selectedCategory) ?.services.find((service) => service.id === selectedService);

  const serviceDuration = selectedServiceData?.duration ?? 0;
  let activeDayOpeningData
  if(selectedDate) activeDayOpeningData = workingDaysData?.find((item) => item.dayOfWeek == format(new Date(selectedDate), "iiii"))
  const [serviceOpeningHour, serviceOpeningMinutes] = (activeDayOpeningData?.open ?? "06:00").split(":");
  const [serviceClosingHour, serviceClosingMinutes] =  (activeDayOpeningData?.close ?? "06:00").split(":");
  const openingServiceTime = set(new Date(selectedDate), { hours: Number(serviceOpeningHour), minutes: Number(serviceOpeningMinutes), seconds: 0})
  const closingServiceTime = set(new Date(selectedDate), { hours: Number(serviceClosingHour), minutes: Number(serviceClosingMinutes), seconds: 0 })
  const hours = eachMinuteOfInterval({start: openingServiceTime, end: closingServiceTime}, {step:15})

  const {mutate} = useMutation({
    mutationKey: ["addReservationManual", selectedDate, selectedServiceData],
    mutationFn: async () => {    
      const selectedAppointmentTime = getValues("time")

      const data = {
        clientId: "walk-in",
        servicesIds: [getValues("service")],
        reservationYear: getYear(new Date(selectedDate)),
        reservationMonth: getMonth(new Date(selectedDate)),
        reservationStart: new Date(selectedAppointmentTime),
        reservationEnd: new Date(addMinutes(selectedAppointmentTime, selectedServiceData!.duration)),
        duration: selectedServiceData!.duration,
        charge: Number(selectedServiceData!.price),
        clientName: getValues("clientName"),
        clientPhone: getValues("clientPhone"),
        status: "Zarezerwowana",
        isAddedByBusiness: true,
      }
  
      return await addNewReservationManually(data)
    }
  })

  if (workingDaysDataStatus === "pending" || status === "pending" || appointmentsStatus === "pending") {
    return <p>Ładowanie danych...</p>;
  }
  
  if (workingDaysDataStatus === "error" || status === "error" || appointmentsStatus === "error") {
    return <p>Wystąpił błąd ładowania danych</p>;
  }

  const handleAddingAppointment = () => {
    mutate()
    onClose()
  } 

  if(businessCategoriesStatus == "pending") return <p>PENDING</p>
  if(businessCategoriesStatus == "error") return <p>ERROR</p>

  return (
    <ModalProvider open={open} onClose={onClose} title="Add appointment">
      <form onSubmit={handleSubmit(handleAddingAppointment)} className="flex flex-col gap-4">
        <div className="flex flex-col w-full">
          <FormLabel text="Rodzaj" />
          <select className="border-[0.5px] border-[#E8E8E8] w-3/5 p-2" id="category" {...register('category')} required>
            <option key="0" value="select" disabled>Wybierz</option>
              {businessCategoriesData?.map((category)=>{
                return (<option key={category.id} value={category.id}>{category.name}</option>)
              })}
          </select>
        </div>

            <div className="flex flex-col">
              <FormLabel text="Usługa" />
              <select className="border-[0.5px] border-[#E8E8E8] w-full p-2" id="service" {...register('service')} required>
                <option value="select" disabled>Wybierz</option>
                  { selectedCategory && businessCategoriesData?.map((category)=>(
                      selectedCategory == category.id && category.services.map((service) => {
                          return (<option className="flex flex-row justify-between" key={service.id} value={service.id}>{service.name} {service.duration}</option>)
                      })
                  ))}
              </select>
            </div>


          <div className="flex flex-row gap-10 justify-between">
            <div className="flex flex-col w-3/5">
              <FormLabel text="Dzień" />
              <input type="date" id="date" {...register('date')} required className="border px-1 py-2 rounded" />
            </div>

            {(selectedDate && selectedService && selectedServiceData) &&  <div className="flex flex-col w-2/5">
                <FormLabel text="Godzina" />
                <select className="border-[0.5px] border-[#E8E8E8] px-2 py-2.5" id="time" {...register('time')} required>
                  <option value="" disabled hidden>Godzina</option>

                  {hours.map((time, index) => {
                      const isReserved = appointments?.some((item) => (
                          time >= item.reservationStart && time < item.reservationEnd
                      ))

                      if (isReserved) return null
                      else{
                          const serviceEnd = addMinutes(time, Number(selectedServiceData.duration))
                              
                          const isBetween = appointments!.some((item) =>(
                              time < item.reservationEnd && serviceEnd > item.reservationStart
                          ))

                          if(isBetween) return null

                          const afterWorkingHours = addMinutes(time, serviceDuration) > closingServiceTime
                          if(afterWorkingHours) return null
                          
                          return <option key={index} value={String(time)}>{`${format(time, "HH")}:${format(time, "mm")}`}</option>
                      }
                    
                  })
                  }
                </select>
            </div>
            }
          </div>

          <div>
              <FormLabel text="Client name"/>
              <input type="text" id="clientName" {...register} /> 
          </div>

          <div>
              <FormLabel text="Client phone"/>
              <input type="text" id="clientPhone" {...register}/> 
          </div>

        <button 
          type="submit" 
          className="flex justify-center border w-1/2 py-1.5 rounded bg-[#111] text-[#FFF]"
        >
          Add
        </button>   
      </form>
    </ModalProvider>
  )
}


  
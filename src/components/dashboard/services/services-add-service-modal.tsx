'use client'
import { addNewService } from "@/app/dashboard/services/actions";
import { FormButton } from "@/components/form-button";
import ModalProvider from "@/components/providers/modal-provider";
import { AddServiceSchema, addServiceSchema } from "@/lib/schema";
import { ServicesCategory } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type ServiecAddServiceModalProps = {
  open: boolean;
  onClose: () => void;
  categories: ServicesCategory[]
}

export default function ServiecAddServiceModal({ open, onClose, categories}:ServiecAddServiceModalProps) {
  const queryClient = useQueryClient()

  const timeOptions = [{time: "30min", value: 30}, {time: "45min", value: 45}, {time: "1h", value: 60}, {time: "1h 15min", value: 75},{time: "1h 30min", value: 90}, {time:  "1h 45min", value: 105}, {time: "2h", value: 120}, {time: "2h 15min", value: 135},{time: "2h 30min" , value: 150}, {time:"2h 45min" , value: 165}, {time: "3h", value: 180}, {time: "3h 15min", value: 195}, {time: "3h 30min", value: 210} , {time: "3h 30min", value: 225}, {time: "3h 45min", value: 240}, {time: "4h", value: 255}, {time: "4h 15min", value: 270},{time: "4h 30min" , value: 285}, {time:"4h 45min" , value: 300}, {time: "5h", value: 315}, {time: "5h 15min", value: 330}, {time: "5h 30min" , value: 345}, {time:"5h 45min" , value: 360}, {time:"6h" , value: 375}]

  const { register, handleSubmit, getValues, reset, formState, watch} = useForm<AddServiceSchema>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      description: "",
      duration: 0,
    }
  })  

    const mutation = useMutation({
        mutationFn: async () => {
          const formValues = getValues()
          return await addNewService(formValues)
        }, 
        onSuccess: (data) => {
          if (data) {
            queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] });
          }
          onClose()
          reset()
        },
        onError: (error) => {
          console.error("Error adding service", error);
        },
    });

  return (
    <ModalProvider title="Add new service" open={open} onClose={onClose}>
      <form className="flex flex-col" onSubmit={handleSubmit(() => mutation.mutate())}>
        {/* CONTAINER FOR INPUTS */}
        <div className="w-full pb-8 flex flex-col gap-4">
          {/* SERVICE NAME INPUT */}
          <div className="flex flex-col gap-1">
            <div className="px-0.5 flex flex-row justify-between items-baseline">
              <label htmlFor="name" className="text-md text-[#333] font-normal">Nazwa</label>
              <p className="text-[10px] text-[#999] font-normal mt-1.5">{watch('name').length} / 100</p>
            </div>
            <input
              type="text"
              {...register("name")}
              id="name"
              className="w-full text-sm text-[#111] font-normal leading-none px-2 py-1.5 border border-[#D4D4D4]rounded-md focus:outline-[#333]"
            />
            <p className="text-red-600">{formState.errors.name?.message || ""}</p>
          </div>

          {/* DESCRPTION */}
          <div className="flex flex-col gap-1">
            <div className="px-0.5 flex flex-row justify-between items-baseline">
              <label htmlFor="name" className="text-md text-[#333] font-normal">Opis</label>
              <p className="text-[10px] text-[#999] font-normal mt-1.5">{watch('description').length}/250</p>
            </div>
            <textarea maxLength={250} id="description" className="border text-sm p-2" rows={4} {...register('description')}></textarea>
          </div>
          
          {/* SERVICE CATEGORY AND PRICE INPUTS ROW*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-md text-[#333] font-normal">Opis</label>
            <select className="w-full border-[0.5px] border-[#E8E8E8] p-3" id="category" {...register('category')} required>
              <option value="" disabled hidden>Wybierz kategorię</option>
              {categories && categories.map((category, index) => <option key={index} value={category.id}>{category.name}</option> )}
            </select>
          </div>

          {/* SERVICE DURATION AND PRICE */}
          <div className="w-full flex flex-row gap-3">
            {/* PRICE */}
            <div className="w-1/2 flex flex-col gap-1">
              <label htmlFor="price" className="text-md text-[#333] font-normal">Cena</label>
              <div className="relative box-border">
                <input
                  type="text"
                  {...register("price")}
                  id="price"
                  className="w-full text-sm text-[#111] font-normal leading-none px-2 py-1.5 border border-[#D4D4D4]rounded-md focus:outline-[#333]"
                />  
                <div className="h-[85%] absolute right-0 top-1 flex items-center px-2 leading-none text-[#CCCCCA] bg-[#F2F4F8]">PLN</div>
              </div>
              
              
            </div>
            {/* DURATION */}
            <div className="w-1/2 flex flex-col gap-1">
              <label htmlFor="category" className="text-md text-[#333] font-normal">Czas trwania</label>
              <select className="w-full border-[0.5px] border-[#E8E8E8] p-2" id="duration" {...register('duration', {valueAsNumber:true})}>
                <option value={15}>15 min</option>
                {timeOptions.map((item, index) => <option key={index} value={item.value}>{item.time}</option>)}
              </select>
            </div>
          </div>
        </div>
        
        {/* BUTTONS FOR CANCELING AND ADDING SERVICE */}
        <div className="w-full flex flex-row gap-3">
          <FormButton 
            label="Anuluj" 
            type="button" 
            onClick={() => {onClose(); reset()}} 
            className="text-[#3F3F3F] bg-[#F2F2F2] hover:bg-[#E2E2E2]"
          />
          <FormButton 
            label="Dodaj" 
            type="submit" 
            className="hover:bg-[#333333]"
          />
        </div>
      </form>
    </ModalProvider>
  )
}
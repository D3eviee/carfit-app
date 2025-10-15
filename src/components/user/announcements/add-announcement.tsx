'use client'
import { CloseButton } from "@/components/buttons/close-button";
import { FormError } from "@/components/forms/form-error";
import { useModalStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { SERVICES_CATEGORIES } from '@/lib/data'; 
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { FormLabel } from "@/components/forms/form-label";
import { FormInput } from "@/components/forms/form-input";
import { useClientCars } from "@/lib/hooks/client/useClientCars";

export default function AddAnnouncementsModal(){
  const closeModal = useModalStore(store => store.closeModal)

  const {register, formState} = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      car: "",
      town: "",
      district: ""
    }
  })

  const {data: userCarsData, status: userCarsDataStatus} = useClientCars()
  if(userCarsDataStatus == "pending") return <Spinner/>
  if(userCarsDataStatus == "error") return <Error/>

  return(
   <div className="flex flex-col px-8 pt-6 pb-3 bg-white backdrop-blur-[3px] ring-1 ring-white inset-shadow-white rounded-2xl w-3xl  space-y-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-black">Nowe zgłoszenie</h1>
        <CloseButton onCloseFn={closeModal}/>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <FormLabel htmlFor="title" labelText="Temat"/>
          <FormInput
            id="title"
            type="text"
            {...register("title")}
          />
          <FormError error={formState.errors.title?.message}/>
        </div>

        <div className="w-full flex flex-row gap-5">
          <div className="w-full flex flex-col gap-1">
            <FormLabel htmlFor="title" labelText="Kategoria"/>
            <select
              className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            >
              { SERVICES_CATEGORIES.map((item) => 
                  <option 
                    key={item.name}
                    className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
                  >
                    {item.name}
                  </option>
                )
              }
            </select>
            <FormError error={formState.errors.category?.message}/>
          </div>

          <div className="w-full flex flex-col gap-1">
            <FormLabel htmlFor="car" labelText="Samochód"/>
            <select
              {...register("car")}
              className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            >
              { userCarsData.map((item) => 
                  <option 
                    key={item.id}
                    className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
                  >
                    {`${item.brand} - ${item.model} - ${item.year}`}
                  </option>
                )
              }
            </select>
            <FormError error={formState.errors.category?.message}/>
          </div>
        </div>

        <div className="w-full flex flex-row gap-5">
          <div className="w-full flex flex-col gap-2.5">
            <FormLabel htmlFor="town" labelText="Miejscowość"/>
            <FormInput
              id="title"
              type="text"
              {...register("town")}
            />
            <FormError error={formState.errors.title?.message}/>
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <FormLabel htmlFor="district" labelText="Dzielnica"/>
            <FormInput
              id="district"
              type="text"
              {...register("district")}
            />
            <FormError error={formState.errors.title?.message}/>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <FormLabel htmlFor="description" labelText="Opis"/>
          <textarea
            id="description"
            rows={6}
            className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            {...register("description")}
          ></textarea>
          <FormError error={formState.errors.description?.message}/>
        </div>
      </div>
    </div>
  )
}
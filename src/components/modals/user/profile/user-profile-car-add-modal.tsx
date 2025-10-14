'use client'
import { FormError } from "@/components/forms/form-error";
import { useForm } from "react-hook-form";
import { Spinner } from "../../../spinner";
import { ModalBackButton } from "../../../buttons/modal-back-button";
import { AddNewCar, addNewCarSchema } from "@/lib/schema";
import { UserProfileModalLabel } from "./user-profile-modal-label";
import { UserProfileModalInput } from "./user-profile-modal-input";
import { useAddClientCar } from "@/lib/hooks/client/useAddClientCar";
import { zodResolver } from "@hookform/resolvers/zod";

export const UserProfileAddCarModal = () => {
  const {register, formState, watch, handleSubmit} = useForm<AddNewCar>({
    resolver: zodResolver(addNewCarSchema),
    defaultValues: { brand: "", model: "", year: "" }
  })

  const watchBrand = watch("brand")
  const watchModel = watch("model")
  const watchYear = watch("year")
  const isAddButtonDisabled = !(watchBrand && watchModel  && watchYear) 

  const {mutate, isPending} = useAddClientCar()
  const handleAddingNewCar = (data:AddNewCar) => mutate(data)

  return (
    <div className="w-full h-full flex flex-col bg-white sm:max-w-[420px] sm:h-fit sm:rounded-4xl">
      {/* NAV */}
      <div className="w-full p-6">
        <ModalBackButton/>
      </div>

      <div className="px-8 flex flex-col gap-10 pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-main-black font-medium leading-none">Dodaj nowy pojazd</h1>
          <p className="text-sm  text-main-black leading-5 font-light">Dodanie pojazdu ułatwia rezerwację oraz dostarcza serwisom informacji o twoim pojeździe</p>
        </div>

        <form onSubmit={handleSubmit(handleAddingNewCar)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <UserProfileModalLabel htmlFor="brand" labelText="Marka"/>
            <UserProfileModalInput type="text" id="brand" register={register("brand")} />
            <FormError error={formState.errors.brand?.message}/>
          </div>
          
          <div className="flex flex-col gap-2.5">
            <UserProfileModalLabel htmlFor="model" labelText="Model"/>
            <UserProfileModalInput type="text" id="model" register={register("model")} />
            <FormError error={formState.errors.model?.message}/>
          </div>
          
          <div className="flex flex-col gap-2.5">
            <UserProfileModalLabel htmlFor="year" labelText="Rok produkcji"/>
            <UserProfileModalInput type="text" id="year" register={register("year")} />
            <FormError error={formState.errors.year?.message}/>
          </div>

          <button
            type="submit" 
            disabled={isAddButtonDisabled || isPending}
            className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
          >
            {isPending ? <Spinner/> : "Dodaj pojazd"}
          </button>  
        </form>
      </div>
    </div>
  )
}
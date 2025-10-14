'use client'
import { FormError } from "@/components/forms/form-error";
import { useForm } from "react-hook-form";
import { ModalBackButton } from "../../../buttons/modal-back-button";
import { AddNewCar, addNewCarSchema } from "@/lib/schema";
import UserProfileDeleteCarButton from "../../../user/profile/user-profile-delete-car-button";
import { UserProfileModalLabel } from "./user-profile-modal-label";
import { UserProfileModalInput } from "./user-profile-modal-input";
import { UserProfileModalSubmitButton } from "./user-profile-modal-submit-button";
import { useEditClientCar } from "@/lib/hooks/client/useEditClientCar";
import { zodResolver } from "@hookform/resolvers/zod";

type UserProfileEditCarModalProps = {
  car: {
    model: string
    id: string
    brand: string
    year: number               
  }
}

export const UserProfileCarEditModal = ({car}:UserProfileEditCarModalProps) => {
  const {register, formState, watch, handleSubmit} = useForm<AddNewCar>({
    resolver: zodResolver(addNewCarSchema),
    defaultValues: {
      brand: car.brand,
      model: car.model,
      year: String(car.year)
    }
  })

  const watchBrand = watch("brand")
  const watchModel = watch("model")
  const watchYear = watch("year")
  const isSaveButtonDisabled = (watchBrand == car.brand && watchModel == car.model && watchYear == String(car.year)) ? true : false

  const {mutate, isPending} = useEditClientCar(car.id)
  const handleUpdatingCarInformation = (data:AddNewCar) => mutate(data)

  return(
    <div className="w-full h-full flex flex-col bg-white sm:max-w-[420px] sm:h-fit sm:rounded-4xl">
      {/* NAV */}
      <div className="w-full p-6">
        <ModalBackButton/>
      </div>

      <form onSubmit={handleSubmit(handleUpdatingCarInformation)} className="w-full flex flex-col gap-6 pb-8 px-8">
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

        <UserProfileDeleteCarButton carId={car.id}/>

        <UserProfileModalSubmitButton
          isPending={isPending}
          disabled={isSaveButtonDisabled || isPending}
        />
      </form>
    </div>
  )
}
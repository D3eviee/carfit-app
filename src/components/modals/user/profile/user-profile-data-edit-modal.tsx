'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeClientProfileData, changeClientProfileData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBackButton } from "../../../buttons/modal-back-button";
import { UserProfileDataEditModalImage } from "./user-profile-data-edit-modal-image";
import { FormError } from "../../../forms/form-error";
import { UserProfileModalSubmitButton } from "./user-profile-modal-submit-button";
import { UserProfileModalLabel } from "./user-profile-modal-label";
import { UserProfileModalInput } from "./user-profile-modal-input";
import { useEditClientProfileData } from "@/lib/hooks/client/useEditClientProfileData";

type UserProfileDataEditModalProps = {
  phone: string
  email: string
  name: string                
}

export const UserProfileDataEditModal = ({name, phone, email}:UserProfileDataEditModalProps) => {
  const {register, formState, handleSubmit, watch} = useForm<ChangeClientProfileData>({
    resolver: zodResolver(changeClientProfileData),
    defaultValues: { name, email, phone }
  })

  const watchEmail = watch("email")
  const watchName = watch("name")
  const watchPhone = watch("phone")
  const isSaveButtonDisabled = (watchEmail == email && watchName == name && watchPhone == phone) ? true : false

  const {mutate, isPending} = useEditClientProfileData({phone, email, name})
  const onSubmit: SubmitHandler<ChangeClientProfileData> = async (newData) => mutate(newData)
  
  return(
    <div className="w-full h-full flex flex-col bg-white sm:max-w-[420px] sm:h-fit sm:rounded-4xl">
      {/* NAV */}
      <div className="w-full p-6">
        <ModalBackButton/>
      </div>

      {/* EDIT FIELDS */}
      <div className="px-8 flex flex-col gap-10 pb-8">
        <UserProfileDataEditModalImage/>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <UserProfileModalLabel htmlFor="name" labelText="Imię i nazwisko"/>
            <UserProfileModalInput type="text" id="name" register={register("name")} />
            <FormError error={formState.errors.name?.message} />
          </div>

          <div className="flex flex-col gap-2.5">
            <UserProfileModalLabel htmlFor="email" labelText="Email"/>
            <UserProfileModalInput type="email" id="email" register={register("email")} />
            <FormError error={formState.errors.email?.message} />
          </div>

          <div className="flex flex-col gap-2.5">
            <UserProfileModalLabel htmlFor="phone" labelText="Numer telefonu"/>
            <UserProfileModalInput type="phone" id="phone" register={register("phone")} />
            <FormError error={formState.errors.phone?.message} />
          </div>

          <UserProfileModalSubmitButton 
            disabled={isSaveButtonDisabled || isPending}
            isPending={isPending}
          />
        </form>
      </div>
    </div>
  )
}
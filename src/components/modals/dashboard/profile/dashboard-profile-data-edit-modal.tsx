'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { dashboardProfileEditPersonalData, DashboardProfileEditPersonalData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardProfileModalLabel } from "./dashboard-profile-modal-label";
import { DashboardProfileModalInput } from "./dashboard-profile-modal-input";
import { DashboardProfileModalSubmitButton } from "./dashboard-profile-modal-submit-button";
import { DashboardProfileDataEditImage } from "./dashboard-profile-data-edit-image";
import { FormError } from "@/components/forms/form-error";
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { useEditDashboardProfileData } from "@/lib/hooks/dashboard/useEditDashboardProfileData";

type DashboardProfileDataEditModalProps = {
  phone: string
  email: string
  owner: string                
}

export const DashboardProfileDataEditModal = ({ owner, email, phone }:DashboardProfileDataEditModalProps) => {
  const {register, formState, handleSubmit, watch} = useForm<DashboardProfileEditPersonalData>({
    resolver: zodResolver(dashboardProfileEditPersonalData),
    defaultValues: { owner, email, phone }
  })
  
  const watchEmail = watch("email")
  const watchOwner = watch("owner")
  const watchPhone = watch("phone")
  const isSaveButtonDisabled = (watchEmail == email && watchOwner == owner && watchPhone == phone) ? true : false

  const {mutate, isPending} = useEditDashboardProfileData({phone, email, owner})
  const onSubmit: SubmitHandler<DashboardProfileEditPersonalData> = async (newData) => mutate(newData)

  return  (
    <div className="w-full h-full flex flex-col bg-white sm:max-w-[420px] sm:h-fit sm:rounded-4xl">
      {/* NAV */}
      <div className="w-full p-6">
        <ModalBackButton/>
      </div>

      {/* EDIT FIELDS */}
      <div className="px-8 flex flex-col gap-10 pb-8">
       <DashboardProfileDataEditImage/>
       
       <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <DashboardProfileModalLabel htmlFor="owner" labelText="Imię i nazwisko"/>
            <DashboardProfileModalInput type="text" id="owner" register={register("owner")} />
            <FormError error={formState.errors.owner?.message} />
          </div>

          <div className="flex flex-col gap-2.5">
            <DashboardProfileModalLabel htmlFor="email" labelText="Email"/>
            <DashboardProfileModalInput type="email" id="email" register={register("email")} />
            <FormError error={formState.errors.email?.message} />
          </div>

          <div className="flex flex-col gap-2.5">
            <DashboardProfileModalLabel htmlFor="phone" labelText="Numer telefonu"/>
            <DashboardProfileModalInput type="phone" id="phone" register={register("phone")} />
            <FormError error={formState.errors.phone?.message} />
          </div>

          <DashboardProfileModalSubmitButton 
            disabled={isSaveButtonDisabled || isPending}
            isPending={isPending}
          />
        </form>
      </div>
    </div>
  )
}       
'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { FormError } from "@/components/forms/form-error";
import { LocationSettings, locationSettingsSchema } from "@/lib/schema";
import { FormLabel } from "@/components/forms/form-label";
import { FormInput } from "@/components/forms/form-input";
import { useSettingUpdateLocation } from "@/lib/hooks/dashboard/useSettingsUpdateLocation";
import { DashboardSettingSaveButton } from "./dashboard-settings-save-button";

type DashboardSettingsEditLocationModalProps = {
  locationData: {
    town: string
    district: string
    street: string
    zipcode: string            
  }              
}

export const DashboardSettingsEditLocationModal = ({locationData}:DashboardSettingsEditLocationModalProps) => {
  const { district, street, town, zipcode } = locationData
  const {register, formState, handleSubmit, watch} = useForm<LocationSettings>({
    resolver: zodResolver(locationSettingsSchema),
    defaultValues: { district, street, town, zipcode }
  })

  const watchDistrict = watch("district")
  const watchStreet = watch("street")
  const watchTown = watch("town")
  const watchZipcode = watch("zipcode")
  const isSaveButtonDisabled = watchDistrict == district && watchStreet == street && watchTown == town && watchZipcode == zipcode

  const {mutate, isPending} = useSettingUpdateLocation()
  const onEditLocationSubmit: SubmitHandler<LocationSettings> = async (data) => { mutate(data)}  
  
  return(
    <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[400px] sm:h-fit sm:rounded-4xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      {/* NAV */}
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>

      <div className="px-8 flex flex-col gap-6">
        <form onSubmit={handleSubmit(onEditLocationSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <FormLabel htmlFor="town" labelText="Miasto"/>
            <FormInput  id="town" type="text" {...register("town")}/>
            <FormError error={formState.errors.town?.message}/>
          </div>

          <div className="flex flex-col gap-2.5">
            <FormLabel htmlFor="district" labelText="Dzielnica"/>
            <FormInput  id="district" type="text" {...register("district")}/>
             <FormError error={formState.errors.district?.message}/>
          </div>

          <div className="flex flex-col gap-2.5">
            <FormLabel htmlFor="zipcode" labelText="Kod pocztowy"/>
            <FormInput  id="zipcode" type="text" {...register("zipcode")}/>
            <FormError error={formState.errors.zipcode?.message}/>
          </div>

          <div className="flex flex-col gap-2.5">
            <FormLabel htmlFor="street" labelText="Ulica"/>
            <FormInput  id="street" type="text" {...register("street")}/>
            <FormError error={formState.errors.street?.message}/>
          </div>

          <DashboardSettingSaveButton type="submit" isPending={isPending} disabled={isSaveButtonDisabled || isPending}/>
        </form>
      </div>
    </div>
  )
}
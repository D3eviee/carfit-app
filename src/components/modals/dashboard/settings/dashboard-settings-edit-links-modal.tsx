'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { Spinner } from "@/components/spinner";
import { FormError } from "@/components/forms/form-error";
import { BusinessSocialLinks, businessSocialLinksSchema } from "@/lib/schema";
import { FormLabel } from "@/components/forms/form-label";
import { FormInput } from "@/components/forms/form-input";
import { useSettingUpdateSocialLinks } from "@/lib/hooks/dashboard/useSettingsUpdateSocialLinks";
import { DashboardSettingSaveButton } from "./dashboard-settings-save-button";

type DashboardSettingsEditLinksModalProps = {
  facebookUrl:string            
  instagramUrl:string            
  websiteUrl:string            
}

export const DashboardSettingsEditLinksModal = ({facebookUrl, instagramUrl, websiteUrl}:DashboardSettingsEditLinksModalProps) => {
  const {register, formState, handleSubmit, watch} = useForm<BusinessSocialLinks>({
    resolver: zodResolver(businessSocialLinksSchema),
    defaultValues: { facebookUrl, instagramUrl, websiteUrl }
  })

  const watchFb = watch("facebookUrl")
  const watchIg = watch("instagramUrl")
  const watchWebsite = watch("websiteUrl")
  const isSaveButtonDisabled = (watchFb === facebookUrl && watchIg === instagramUrl && watchWebsite === websiteUrl)
  const {mutate, isPending} = useSettingUpdateSocialLinks()
  const onEditLinksSubmit: SubmitHandler<BusinessSocialLinks> = async (data) => mutate(data)
  
  return(
    <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[600px] sm:h-fit sm:rounded-4xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      {/* NAV */}
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>

      {/* EDIT FIELDS */}
      <div className="px-8 flex flex-col gap-10">
        <form onSubmit={handleSubmit(onEditLinksSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <FormLabel htmlFor="facebookUrl" labelText="Facebook"/>
            <FormInput  id="facebookUrl" type="text" {...register("facebookUrl")}/>
            <FormError error={formState.errors.facebookUrl?.message}/>
          </div>

          <div className="flex flex-col gap-2.5">
            <FormLabel htmlFor="instagramUrl" labelText="Instagram"/>
            <FormInput  id="instagramUrl" type="text" {...register("instagramUrl")}/>
            <FormError error={formState.errors.instagramUrl?.message}/>
          </div>

          <div className="flex flex-col gap-2.5">
            <FormLabel htmlFor="websiteUrl" labelText="Strona internetowa"/>
            <FormInput  id="websiteUrl" type="text" {...register("websiteUrl")}/>
            <FormError error={formState.errors.websiteUrl?.message}/>
          </div>

          <DashboardSettingSaveButton type="submit" isPending={isPending} disabled={isSaveButtonDisabled || isPending}/>
        </form>
      </div>
    </div>
  )
}
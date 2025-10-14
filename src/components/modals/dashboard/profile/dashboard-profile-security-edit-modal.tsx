'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBackButton } from "../../../buttons/modal-back-button";
import { ChangePasswordInput, changePasswordSchema } from "@/lib/schema"
import { FormError } from "../../../forms/form-error";
import { DashboardProfileModalLabel } from "./dashboard-profile-modal-label";
import { DashboardProfileModalInput } from "./dashboard-profile-modal-input";
import { useChangeDashboardProfilePassword } from "@/lib/hooks/dashboard/useChangeDashboardProfilePassword";
import { DashboardProfileModalSubmitButton } from "./dashboard-profile-modal-submit-button";

export const DashboardProfileSecurityEditModal = () => {
  const {register, handleSubmit, formState : {errors}, watch} = useForm <ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema)
  })

  const {changePassword, isLoading} = useChangeDashboardProfilePassword()
  const onSubmit: SubmitHandler<ChangePasswordInput> = (data) => changePassword(data);

  const watchCurrentPassword = watch("currentPassword")
  const watchNewPassword = watch("newPassword")
  const watchNewPasswordRepeated = watch("repeatNewPassword")
  const isSaveButtonDisabled = (!watchCurrentPassword || !watchNewPassword.length  || !watchNewPasswordRepeated) ? true : false

  return(
    <div className="w-full h-full flex flex-col bg-white sm:max-w-[420px] sm:h-fit sm:rounded-4xl">
      <div className="w-full p-6">
        <ModalBackButton/>
      </div>

      <div className="px-8 flex flex-col gap-10 pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-main-black font-medium leading-none">Utwórz nowe hasło</h1>
          <p className="text-sm  text-main-black leading-5 font-light">Twoje hasło musi składać się przynajmniej z 8 znaków.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <DashboardProfileModalLabel htmlFor="currentPassword" labelText="Aktualne hasło"/>
              <DashboardProfileModalInput type="password" id="name" register={register("currentPassword")} />
              <FormError error={errors.currentPassword?.message} />
            </div>

            <div className="flex flex-col gap-2.5">
              <DashboardProfileModalLabel htmlFor="newPassword" labelText="Nowe hasło"/>
              <DashboardProfileModalInput type="password" id="newPassword" register={register("newPassword")} />
              <FormError error={errors.newPassword?.message} />
            </div>

            <div className="flex flex-col gap-2.5">
              <DashboardProfileModalLabel htmlFor="repeatNewPassword" labelText="Powtórz nowe hasło"/>
              <DashboardProfileModalInput type="password" id="repaeatNewPassword" register={register("repeatNewPassword")} />
              <FormError error={errors.repeatNewPassword?.message} />
            </div>

          <DashboardProfileModalSubmitButton
            isPending={isLoading}
            disabled={isSaveButtonDisabled || isLoading}
          />  
        </form>
      </div>
    </div>
  )
}
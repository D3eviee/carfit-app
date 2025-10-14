'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBackButton } from "../../../buttons/modal-back-button";
import { ChangePasswordInput, changePasswordSchema } from "@/lib/schema"
import { FormError } from "../../../forms/form-error";
import { UserProfileModalSubmitButton } from "./user-profile-modal-submit-button";
import { UserProfileModalLabel } from "./user-profile-modal-label";
import { UserProfileModalInput } from "./user-profile-modal-input";
import { useChangeClientPassword } from "@/lib/hooks/client/useChangeClientPassword";

export const UserProfileSecurityEditModal = () => {
  const {register, handleSubmit, formState : {errors}, watch} = useForm <ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema)
  })

  const watchCurrentPassword = watch("currentPassword")
  const watchNewPassword = watch("newPassword")
  const watchNewPasswordRepeated = watch("repeatNewPassword")
  const isSaveButtonDisabled = (!watchCurrentPassword || !watchNewPassword.length  || !watchNewPasswordRepeated) ? true : false

  const {changePassword, isLoading} = useChangeClientPassword()
  const onSubmit: SubmitHandler<ChangePasswordInput> = (data) => changePassword(data);

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
              <UserProfileModalLabel htmlFor="currentPassword" labelText="Aktualne hasło"/>
              <UserProfileModalInput type="password" id="currentPassword" register={register("currentPassword")} />
              <FormError error={errors.currentPassword?.message} />
            </div>

            <div className="flex flex-col gap-2.5">
              <UserProfileModalLabel htmlFor="newPassword" labelText="Nowe hasło"/>
              <UserProfileModalInput type="password" id="newPassword" register={register("newPassword")} />
              <FormError error={errors.newPassword?.message} />
            </div>

            <div className="flex flex-col gap-2.5">
              <UserProfileModalLabel htmlFor="repeatNewPassword" labelText="Powtórz nowe hasło"/>
              <UserProfileModalInput type="password" id="repaeatNewPassword" register={register("repeatNewPassword")} />
              <FormError error={errors.repeatNewPassword?.message} />
            </div>

          <UserProfileModalSubmitButton
            isPending={isLoading}
            disabled={isSaveButtonDisabled || isLoading}
          />  
        </form>
      </div>      
    </div>
  )
}
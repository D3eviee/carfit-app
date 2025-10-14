import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useBusinessOnboardingStore, useToastStore } from "@/lib/store";
import { FormError } from "../../forms/form-error";
import { BusinessOnboardingButton } from "./business-onboarding-button";
import { businessOnboardingEmailSchema, BusinessOnboardingEmailSchema } from "@/lib/schema";
import { isBusinessEmailAvailable } from "@/app/(auth)/business/onboarding/actions";
import { AuthFormLabel } from "../auth-form-label";
import { AuthFormInput } from "../auth-form-input";

export const BusinessOnboardingEmail = ({onNextStepFn}:{onNextStepFn: () => void}) => {
  const setBusinessOnboardingData = useBusinessOnboardingStore((state)=>state.setBusinessOnboardingData)
  const showToast = useToastStore(store => store.showToast)
  const {email, password, repeatedPassword} = useBusinessOnboardingStore(store => store)

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState } = useForm<BusinessOnboardingEmailSchema>({
    resolver: zodResolver(businessOnboardingEmailSchema),
    defaultValues: {
      email: email,
      password: password,
      repeatedPassword: repeatedPassword
    }
  })

  // HANDLING DATA AND MOVING TO NEXT STEP
  const submitEmailForm = async (data: BusinessOnboardingEmailSchema) => {
    const isEmailAvailable = await isBusinessEmailAvailable(data.email)
    if(!isEmailAvailable.isAvailable){
      showToast(isEmailAvailable.message, "error")
      return 
    }

    setBusinessOnboardingData(data)
    onNextStepFn()
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <form onSubmit={handleSubmit(submitEmailForm)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <AuthFormLabel htmlFor="email" labelText="Email"/>
            <AuthFormInput type="email" id="email" register={register("email")} />
            <FormError error={formState.errors.email?.message}/>
          </div>

          <div className="flex flex-col gap-2.5">
            <AuthFormLabel htmlFor="password" labelText="Hasło"/>
            <AuthFormInput type="password" id="password" register={register("password")} />
            <FormError error={formState.errors.password?.message} />
          </div>

          <div className="flex flex-col gap-2.5">
            <AuthFormLabel htmlFor="repeatedPassword" labelText="Powtórz hasło"/>
            <AuthFormInput type="password" id="repeatedPassword" register={register("repeatedPassword")} />
            <FormError error={formState.errors.repeatedPassword?.message} />
          </div>
        </div>

        <BusinessOnboardingButton label="Dalej" disabled={formState.isValidating}/>
      </form>

      <p className="text-center text-[#333] text-sm font-light">Masz już konto?
        <Link href='/business/sign-in'>
          <span className="text-[#007AFF] font-semibold ml-1">Zaloguj</span>
        </Link>
      </p> 
    </div>
  )
}


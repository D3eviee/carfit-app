import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessOnboardingSchema } from "@/lib/schema";
import { useBusinessOnboardingStore, useToastStore } from "@/lib/store";
import { BusinessOnboardingButton } from "./business-onboarding-button";
import { isBusinessPhoneAvailable } from "@/app/(auth)/business/onboarding/actions";
import { FormError } from "@/components/forms/form-error";
import { AuthFormLabel } from "../auth-form-label";
import { AuthFormInput } from "../auth-form-input";

export const BusinessOnboardingInformation = ({onNextStepFn}:{onNextStepFn: () => void}) => {
  const showToast = useToastStore(store => store.showToast)

  const onboardingBusinessInformation = businessOnboardingSchema.pick({ businessName: true, businessOwner: true, businessPhone: true})
  type OnboardingBusienssInformation = z.infer<typeof onboardingBusinessInformation>;

  const setBusinessOnboardingData = useBusinessOnboardingStore(store => store.setBusinessOnboardingData)
  const businessName =  useBusinessOnboardingStore(store => store.businessName)
  const busineesOwner = useBusinessOnboardingStore(store => store.businessOwner)
  const busisnessPhone = useBusinessOnboardingStore(store => store.businessPhone)
  
  const { register, handleSubmit, formState } = useForm<OnboardingBusienssInformation>({
    resolver: zodResolver(onboardingBusinessInformation),
    defaultValues: {
      businessName: businessName,
      businessOwner: busineesOwner,
      businessPhone: busisnessPhone,
    }
  });

  // HANDLING DATA AND MOVING TO NEXT STEP
  const submitInformationForm = async (data: OnboardingBusienssInformation) => {
    const isPhoneAvailable = await isBusinessPhoneAvailable(data.businessPhone)
      if(!isPhoneAvailable.isAvailable){
        showToast(isPhoneAvailable.message, "error")
        return 
      }
      
      setBusinessOnboardingData(data)
      onNextStepFn()
    }

  return (
    <form onSubmit={handleSubmit(submitInformationForm)} className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <AuthFormLabel htmlFor="businessName" labelText="Nazwa serwisu"/>
        <AuthFormInput type="text" id="businessName" register={register("businessName")} />
        <FormError error={formState.errors.businessName?.message} />
      </div>
      
      <div className="flex flex-col gap-2.5">
        <AuthFormLabel htmlFor="businessPhone" labelText="Numer telefonu serwisu"/>
        <AuthFormInput 
          type="text" 
          id="businessPhone" 
          {...register("businessPhone", { onChange: (e) => {
            const raw = e.target.value.replace(/\D/g, "").slice(0, 9)
            const formatted = raw.replace(/(\d{3})(\d{0,3})(\d{0,3})/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "))
            e.target.value = formatted;
          }})}
        />
        <FormError error={formState.errors.businessPhone?.message} />
      </div>

      <div className="flex flex-col gap-2.5">
        <AuthFormLabel htmlFor="businessOwner" labelText="Imię i nazwisko właściciela"/>
        <AuthFormInput type="text" id="businessOwner" register={register("businessOwner")} />
        <FormError error={formState.errors.businessOwner?.message} />
      </div>
      
      <BusinessOnboardingButton label="Dalej" disabled={formState.isValidating}/>
    </form>
  );
}

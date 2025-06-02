import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessOnboardingSchema } from "@/lib/schema";
import { useOnboardingStore } from "@/lib/store";
import { AuthFormLabel } from "../auth-form-input";
import { FormButton } from "../form-button";

export default function OnboardingBusienssInformation({ onClick = () => {} }) {
  const onboardingBusienssInformation = businessOnboardingSchema.pick({
    businessName: true,
    businessOwner: true,
    businessPhone: true,
  });
  type OnboardingBusienssInformation = z.infer<typeof onboardingBusienssInformation>;

  const setData = useOnboardingStore((state) => state.setData);

  const { register, handleSubmit, formState, trigger } = useForm<OnboardingBusienssInformation>({
    resolver: zodResolver(onboardingBusienssInformation),
    defaultValues: {
      businessName: useOnboardingStore((state) => state.businessName),
      businessOwner: useOnboardingStore((state) => state.businessOwner),
      businessPhone: useOnboardingStore((state) => state.businessPhone),
    },
  });

  const onSubmit = async (data: OnboardingBusienssInformation) => {
    const isValid = await trigger();
    if (isValid) {
      setData(data);
      onClick();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <AuthFormLabel
        inputId="businessName" 
        htmlFor="businessName" 
        inputType="text"  
        inputPlaceholder="Tesla" 
        label="Nazwa biznesu" 
        error={formState.errors.businessName?.message}
        register={register("businessName")}
      />

      <AuthFormLabel
        inputId="businessPhone" 
        htmlFor="businessPhone" 
        inputType="text"  
        inputPlaceholder="514333901" 
        label="Numer serwisu" 
        error={formState.errors.businessPhone?.message}
        register={register("businessPhone")}
      />

      <AuthFormLabel
        inputId="businessOwner" 
        htmlFor="businessOwner" 
        inputType="text"  
        inputPlaceholder="Jacky Macky" 
        label="Właściciel" 
        error={formState.errors.businessOwner?.message}
        register={register("businessOwner")}
      />

      <FormButton label="Dalej" disabled={formState.isValidating}/>
    </form>
  );
}

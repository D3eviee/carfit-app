import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormButton } from '../form-button';
import { useOnboardingStore } from '@/lib/store';
import { AuthFormLabel } from '../auth-form-input';

export default function OnboardingAdress({ onClick = () => {} }){
  //DEFINING FORM TYPES
  const onboardingAddress = businessOnboardingSchema.pick({
    businessTown: true,
    businessZipcode: true,
    businessDistrict: true,
    businessStreet: true
  });

  type OnboardingAddress = z.infer<typeof onboardingAddress>
  const setData = useOnboardingStore((state)=>state.setData)

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, trigger } =
      useForm<OnboardingAddress>({
        resolver: zodResolver(onboardingAddress),
        defaultValues: {
          businessTown: useOnboardingStore((state)=> state.businessTown),
          businessZipcode: useOnboardingStore((state)=> state.businessZipcode),
          businessDistrict: useOnboardingStore((state)=> state.businessDistrict),
          businessStreet: useOnboardingStore((state)=> state.businessStreet),
        },
      });

    const onSubmit = async (data: OnboardingAddress) => {
      const isValid = await trigger()
      if(isValid){
        onClick();
        setData(data)
      }
    };

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <AuthFormLabel
        inputId="businessTown" 
        htmlFor="businessTown" 
        inputType="text"  
        inputPlaceholder="Poznań" 
        label="Miasto" 
        error={formState.errors.businessTown?.message}
        register={register("businessTown")}
      />

      <AuthFormLabel
        inputId="businessZipcode" 
        htmlFor="businessZipcode" 
        inputType="text"  
        inputPlaceholder="61-131" 
        label="Kod pocztowy" 
        error={formState.errors.businessZipcode?.message}
        register={register("businessZipcode")}
      />

      <AuthFormLabel
        inputId="businessDistrict" 
        htmlFor="businessDistrict" 
        inputType="text"  
        inputPlaceholder="Poznań" 
        label="Dzielnica" 
        error={formState.errors.businessDistrict?.message}
        register={register("businessDistrict")}
      />

      <AuthFormLabel
        inputId="businessStreet" 
        htmlFor="businessStreet" 
        inputType="text"  
        inputPlaceholder="Milczańska" 
        label="Ulica" 
        error={formState.errors.businessStreet?.message}
        register={register("businessStreet")}
      />

      <FormButton label="Continue" disabled={formState.isValidating}/>
    </form>    
  )
}
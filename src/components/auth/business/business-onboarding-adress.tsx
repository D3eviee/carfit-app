import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBusinessOnboardingStore } from '@/lib/store';
import { BusinessOnboardingButton } from './business-onboarding-button';
import { FormError } from '@/components/forms/form-error';
import { useRef } from 'react';
import { AuthFormLabel } from '../auth-form-label';
import { AuthFormInput } from '../auth-form-input';

export const BusinessOnboardingAdress = ({onNextStepFn}:{onNextStepFn: () => void}) => {
  const businessOnboardingAdress = businessOnboardingSchema.pick({ businessTown: true, businessZipcode: true, businessDistrict: true, businessStreet: true})
  type BusinessOnboardingAdress = z.infer<typeof businessOnboardingAdress>

  const businessTown= useBusinessOnboardingStore(store=>store.businessTown)
  const businessDistrict = useBusinessOnboardingStore(store=>store.businessDistrict)
  const businessZipcode = useBusinessOnboardingStore(store=>store.businessZipcode)
  const businessStreet = useBusinessOnboardingStore(store=>store.businessStreet)
  const setBusinessOnboardingData = useBusinessOnboardingStore(store=>store.setBusinessOnboardingData)

  const previousZipCodeValue = useRef("");

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState } = useForm<BusinessOnboardingAdress>({
    resolver: zodResolver(businessOnboardingAdress),
      defaultValues: {
        businessTown: businessTown,
        businessDistrict: businessDistrict,
        businessZipcode: businessZipcode,
        businessStreet: businessStreet
      },
    });

    // HANDLING DATA AND MOVING TO NEXT STEP
    const submitAdressForm = async (data: BusinessOnboardingAdress) => {
      setBusinessOnboardingData(data)
      onNextStepFn()
    }

  return(
    <form onSubmit={handleSubmit(submitAdressForm)} className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <AuthFormLabel htmlFor="businessTown" labelText="Miasto"/>
        <AuthFormInput type="text" id="businessTown" register={register("businessTown")} />
        <FormError error={formState.errors.businessTown?.message} />
      </div>

      <div className="flex flex-col gap-2.5">
        <AuthFormLabel htmlFor="businessDistrict" labelText="Dzielnica"/>
        <AuthFormInput type="text" id="businessDistrict" register={register("businessDistrict")} />
        <FormError error={formState.errors.businessDistrict?.message} />
      </div>

      <div className="flex flex-col gap-2.5">
        <AuthFormLabel htmlFor="businessZipcode" labelText="Kod pocztowy"/>
        <AuthFormInput 
          type="text" 
          id="businessZipcode" 
          inputMode='numeric'
          {...register("businessZipcode", { onChange: (e) => {
            let value = e.target.value.replace(/\D/g, "")
            const isDeleting = previousZipCodeValue.current.length > value.length;
            if (value.length > 2) {
              value = value.slice(0, 5)
              value = `${value.slice(0, 2)}-${value.slice(2)}`;
            } else if (value.length === 2 && !isDeleting) value = `${value}-`

            previousZipCodeValue.current = value;
            e.target.value = value;
          }})}  
          />
        <FormError error={formState.errors.businessZipcode?.message} />
      </div>

      <div className="flex flex-col gap-2.5">
        <AuthFormLabel htmlFor="businessStreet" labelText="Ulica"/>
        <AuthFormInput type="text" id="businessStreet" register={register("businessStreet")} />
        <FormError error={formState.errors.businessStreet?.message} />
      </div>
      
      <BusinessOnboardingButton label="Dalej" disabled={formState.isValidating}/>
    </form>    
  )
}
import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBusinessOnboardingStore } from '@/lib/store';
import { BusinessOnboardingButton } from './business-onboarding-button';
import { FormError } from '@/components/forms/form-error';

export const BusinessOnboardingAbout = ({onNextStepFn}:{onNextStepFn: () => void}) => {
  //DEFINING FORM TYPES
  const businessOnboardingAbout = businessOnboardingSchema.pick({ businessDescription:true })
  type BusinessOnboardingAbout = z.infer<typeof businessOnboardingAbout>;
  const setBusinessOnboardingData = useBusinessOnboardingStore(store => store.setBusinessOnboardingData)
  const businessDescritpion = useBusinessOnboardingStore(store => store.businessDescription)

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, watch } = useForm<BusinessOnboardingAbout>({
    resolver: zodResolver(businessOnboardingAbout),
    defaultValues: { businessDescription: businessDescritpion }
  })
  const businessDescriptionWatch = watch("businessDescription")

  const onBusinessAboutSubmit = async (data: BusinessOnboardingAbout) => {
    setBusinessOnboardingData(data)
    onNextStepFn()
  }

  return(
    <form onSubmit={handleSubmit(onBusinessAboutSubmit)} className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-2.5">
        <div className='flex flex-row justify-end items-baseline'>
         <p className='text-xs text-[#8A8A8A] pr-1'>{businessDescriptionWatch?.length}/400 </p>
        </div>
        <textarea 
          maxLength={400}
          rows={10}
          id="businessDescription" 
          placeholder="Opowiedz nam o sobie"
          className="w-full bg-[#F6F7FB] px-2 py-2.5 text-sm text-main-black rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]"
          {...register("businessDescription")}
        ></textarea>
        <FormError error={formState.errors.businessDescription?.message}/>
      </div>
      <BusinessOnboardingButton label="Dalej" disabled={formState.isValidating}/>
    </form>    
  )
}
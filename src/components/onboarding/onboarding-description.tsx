import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormLabel } from '../form-label';
import { FormButton } from '../form-button';
import { useOnboardingStore } from '@/lib/store';

export default function OnboardingDescription({ onClick = () => {} }){
  //DEFINING FORM TYPES
  const onboardingAddress = businessOnboardingSchema.pick({
    businessDescription :true
  });

  type OnboardingAddress = z.infer<typeof onboardingAddress>;
  const setData = useOnboardingStore((state)=>state.setData)

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, trigger } =
      useForm<OnboardingAddress>({
        resolver: zodResolver(onboardingAddress),
        defaultValues: {
          businessDescription: useOnboardingStore((state)=> state.businessTown),
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
        <div className='flex flex-col gap-2'>
          <FormLabel text="Town" htmlFor="businessTown" />
          <textarea id="businessDescription" placeholder='About you...' {...register("businessDescription")} rows={8} className='border'></textarea>
        </div>

        <FormButton label="Continue" disabled={formState.isValidating}/>
      </form>    
  )
}
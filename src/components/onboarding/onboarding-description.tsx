import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
          businessDescription: useOnboardingStore((state)=> state.businessDescription),
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
      <div className="w-full">
        <label htmlFor="businessDescription" className="inline-block text-[#333] text-sm mb-[5px]">Opis</label>
        <textarea 
          rows={7}
          {...register("businessDescription")}
          id="businessDescription" 
          placeholder="Opowiedz nam o sobie"
          className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333]"
        ></textarea>
        <p className="text-red-600 text-xs font-medium">{formState.errors.businessDescription?.message}</p>
        
      </div>
      <FormButton label="Dalej" disabled={formState.isValidating}/>
    </form>    
  )
}
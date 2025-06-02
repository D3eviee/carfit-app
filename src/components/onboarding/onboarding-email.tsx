import { useForm } from "react-hook-form";
import { businessOnboardingSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton } from "../form-button";
import Link from "next/link";
import { useOnboardingStore } from "@/lib/store";
import { emailExists } from "@/app/(auth)/actions";
import { AuthFormLabel } from "../auth-form-input";

export default function OnboardingEmail({ onClick = () => {} }) {
  //DEFINING FORM TYPES
  const onboardingEmail = businessOnboardingSchema.pick({
    email: true,
    password: true,
  });

  type OnboardingEmail = z.infer<typeof onboardingEmail>
  const setData = useOnboardingStore((state)=>state.setData)


  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, trigger, setError } =
    useForm<OnboardingEmail>({
      resolver: zodResolver(onboardingEmail),
      defaultValues: {
        email: useOnboardingStore((state)=> state.email),
        password: useOnboardingStore((state)=> state.password),
      },
    });

  //FUNCTION FOR HANDLING FORM
  const onSubmit = async (data: OnboardingEmail) => {
    const isValid = await trigger()

    if(isValid){
      const isEmailAvalable = await emailExists(data.email)

      if(isEmailAvalable.available){
        setError("email", { type: "custom", message: ""}, {shouldFocus:true})
        setData(data)
        onClick()
      }else{
        setError("email", { type: "custom", message: isEmailAvalable.message}, {shouldFocus:true})
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <AuthFormLabel 
          inputId="email" 
          htmlFor="email" 
          inputType="email"  
          inputPlaceholder="carfit@gmail.com" 
          label="Email" 
          error={formState.errors.email?.message}
          register={register("email")}
        />

        <AuthFormLabel 
          inputId="password" 
          htmlFor="password" 
          inputType="password"  
          inputPlaceholder="*********" 
          label="Hasło" 
          error={formState.errors.password?.message}
          register={register("password")}
        />

        <FormButton label="Dalej" disabled={formState.isValidating}/>
      </form>

      <p className="text-center text-[#333333] text-xs font-light pt-5">Masz już konto? 
        <Link href='/business/sign-in'><span className="text-blue-900 font-semibold ml-1">Zaloguj</span></Link>
      </p>
    </div>
  )
}

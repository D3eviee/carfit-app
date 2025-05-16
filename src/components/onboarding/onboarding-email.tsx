import { useForm } from "react-hook-form";
import { businessOnboardingSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "../form-error";
import { FormLabel } from "../form-label";
import { FormButton } from "../form-button";
import Link from "next/link";
import { useOnboardingStore } from "@/lib/store";
import { emailExists } from "@/app/(auth)/actions";

export default function OnboardingEmail({ onClick = () => {} }) {
  //DEFINING FORM TYPES
  const onboardingEmail = businessOnboardingSchema.pick({
    email: true,
    password: true,
  });

  type OnboardingEmail = z.infer<typeof onboardingEmail>;
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div>
          <FormLabel text="Email" htmlFor="email" />
          <input 
            id="email"
            type="text" 
            placeholder="carfit@gmail.com" 
            {...register("email")}
          className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333]"
            />
          <FormError>{formState.errors.email?.message}</FormError>
        </div>

        <div>
          <FormLabel text="Password" htmlFor="password" />
          <input 
            type="password" 
            id="password" 
            placeholder="***********" 
              {...register("password")}
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333]"
          />
          <FormError>{formState.errors.password?.message}</FormError>
        </div>

        <FormButton label="Continue" disabled={formState.isValidating}/>
      </form>

      <p className="text-center text-[#333333] text-xs font-light pt-5">Already have an account? 
        <Link href='/sign-in'><span className="text-blue-900 font-semibold"> Login</span></Link>
      </p>
    </>
  );
}

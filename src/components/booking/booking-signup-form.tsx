'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientOnboardingSchema, clientOnboardingSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";

type BookingSignupFormProps = {
  onClose: () => void
  changeFormFn: () => void
}

export const BookingSignupForm = ({onClose, changeFormFn}:BookingSignupFormProps) =>  {
  const router = useRouter()
  const [error, setError] = useState<string>('')

  const {register, handleSubmit, formState} = useForm<ClientOnboardingSchema>({
    resolver: zodResolver(clientOnboardingSchema),
    defaultValues: { fullname: '', email: '', phone: '', password: '' }
  })

  const onSubmit = async (data: ClientOnboardingSchema) => {
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

      },);

      const responseData = await response.json()

      if (response.ok) {
        router.refresh()
        onClose()
      } else if(responseData.status == 404){
        setError(responseData.error)
      }else{
        setError(responseData.error)
      }
    } catch (error) {
      setError(`Error occured: ${error}`)
    }
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[#191919] text-sm">Imię i nazwisko</label>
              <input
                {...register('fullname')}
                type="text"
                id="name"
                placeholder="Jacky Macky"
                className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[#191919] text-sm">Number telefonu</label>
              <input
                type="string"
                {...register('phone')}
                id="email"
                placeholder="111111222"
                className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
              />
            </div>
          
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[#191919] text-sm">Email</label>
              <input
                type="text"
                {...register('email')}
                id="email"
                placeholder="carfit@gmail.com"
                className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[#191919] text-sm">Hasło</label>
              <input
                {...register('password')}
                type="password"
                id="password"
                placeholder="***********"
                className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
              />
            </div>

            <p className="text-red-500 text-xs">{error || ""}</p>

            <button
                    disabled={formState.isSubmitting}
                    className="w-full flex justify-center py-2.5 bg-[#000] text-white text-md font-normal  rounded-lg shadow-md hover:cursor-pointer hover:bg-[#111]"
                  >
                    {formState.isSubmitting ? <Spinner/> : "Załóż konto"}
                  </button> 

            <p className="text-center text-[#333] text-sm font-light">Posiadasz już konto?
            <span 
              onClick={changeFormFn}
              className="ml-1  text-[#007AFF] font-semibold hover:cursor-pointer"
            > 
              Zaloguj
            </span>
            </p>
      </form>
  )
}

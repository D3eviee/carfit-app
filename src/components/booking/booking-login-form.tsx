'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../spinner";
import { clientLoginSchema, ClientLoginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type BookingLoginFormProps = {
  onClose: () => void
  changeFormFn: () => void
}

export const BookingLoginForm = ({onClose, changeFormFn}:BookingLoginFormProps) =>  {
  const router = useRouter()
  const [formError, setFormError] = useState<string>('')
  const {register, handleSubmit, formState} = useForm<ClientLoginSchema>({
      resolver: zodResolver(clientLoginSchema),
      defaultValues: {
        email: '', 
        password: '' 
      }
    })

  const onSubmit = async (data: ClientLoginSchema) => {
    try {
      const response = await fetch("/api/user-sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      const responseData = await response.json()
      
      if (response.ok) {
        router.refresh()
        onClose()
        }else{
          setFormError(responseData.error)
        }
      } catch(error){
        setFormError(error);
      }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[#191919] text-sm">Email</label>
        <input
          {...register('email')}
          type="text"
          id="email"
          placeholder="carfit@gmail.com"
          className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
        />
        {/* {formState.errors.email.message && <p className="text-red-500 text-xs">{formState.errors.email.message}</p>} */}
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
        {/* {formState.errors.password.message && <p className="text-red-500 text-xs">{formState.errors.password.message}</p>} */}
      </div>
      
      <p className="text-red-500 text-xs">{formError || ""}</p>
      
      <button
        disabled={formState.isSubmitting}
        className="w-full flex justify-center py-2.5 bg-[#000] text-white text-md font-normal  rounded-lg shadow-md hover:cursor-pointer hover:bg-[#111]"
      >
        {formState.isSubmitting ? <Spinner/> : "Zaloguj"}
      </button>   

      <p className="text-center text-[#333] text-sm font-light">Nie masz konta?
        <span 
          onClick={changeFormFn}
          className="ml-1  text-[#007AFF] font-semibold hover:cursor-pointer"
        > Utwórz</span>
      </p>
    </form>
  )
}
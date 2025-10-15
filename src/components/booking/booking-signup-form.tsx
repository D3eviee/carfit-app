'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientOnboardingData, clientOnboardingData } from "@/lib/schema";
import { useModalStore, useToastStore } from "@/lib/store";
import { createClientProfile } from "@/app/(auth)/(client)/onboarding/actions";
import { FormLabel} from "../forms/form-label";
import { FormInput } from "../forms/form-input";
import { FormError } from "../forms/form-error";


export const BookingSignupForm = () =>  {
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)
  const [error, setError] = useState("")
    
    const {register, handleSubmit, formState} = useForm<ClientOnboardingData>({
      resolver: zodResolver(clientOnboardingData),
      defaultValues: {
        name: '',
        email: '',
        phone: '',
        password: ''
      }
    })

    const onSubmit = async (data: ClientOnboardingData) => {
        try {
          const response = await createClientProfile(data)
          if(!response.success){
            setError(response.message)
            return
          }
          
          showToast("Konto zostało utworzeone!", "success")
          closeModal()
          return
        }catch (error) {
          setError("Wystąpił błąd:" + error)
          return 
        }
      }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2.5">
        <FormLabel htmlFor="name" labelText="Imię i nazwisko"/>
         <FormInput
          {...register('name')}
          type="text"
          id="name"
          placeholder="Jacky Macky"
        />
        <FormError error={formState.errors.name?.message}/>
      </div>

      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="email" labelText="Email"/>
         <FormInput
          {...register('email')}
          type="text"
          id="email"
          placeholder="carfit@gmail.com"
        />
        <FormError error={formState.errors.email?.message}/>
      </div>

      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="phone" labelText="Number telefonu"/>
         <FormInput
          type="text"
          {...register('phone')}
          id="phone"
          placeholder="111 111 222"
        />
        <FormError error={formState.errors.phone?.message}/>
      </div>

      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="password" labelText="Hasło"/>
         <FormInput
          type="password"
          {...register('password')}
          id="email"
          placeholder="***********"
        />
        <FormError error={formState.errors.password?.message}/>
      </div>
      
      <p className="text-red-500 text-xs">{error || ""}</p>
      
      <button
        disabled={formState.isSubmitting}
        className="w-full flex justify-center py-2.5 bg-black text-white text-md font-normal  rounded-lg shadow-md hover:cursor-pointer hover:bg-[#111]"
      >
        {formState.isSubmitting ? <Spinner/> : "Załóż konto"}
      </button> 
    </form>
  )
}

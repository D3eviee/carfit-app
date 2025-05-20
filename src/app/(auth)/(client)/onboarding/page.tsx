'use client'
import Image from "next/image";
import login_image from "../../../../../public/login_image.jpg"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormHeader from "@/components/form-header";
import {useForm} from 'react-hook-form'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";

export default function Onboardoarding() {
  const [error, setError] = useState<string>('')
  const router = useRouter();

  type ClientOnboadringData  = {
    name: string
    email: string
    password: string
    phone: string
  }

  const {register, handleSubmit, formState} = useForm<ClientOnboadringData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: ''
    }
  });

  const onSubmit = async (data: ClientOnboadringData) => {
    

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

      },);

      const responseData = await response.json();

      if (response.ok) {
        router.push('/')
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
    <div className="w-full min-h-svh flex lg:flex-row">
      <Link href="/">
        <div className="hidden w-fit absolute bg-[#111] rounded-md hover:bg-[#222222] border p-1 xl:block xl:left-[80px] xl:top-[40px]">
          <ArrowLeft color="#FFFFFF" className="size-7"/>
        </div>
      </Link>

      <div className="w-full bg-[#FDFCFF] flex flex-col items-center justify-center lg:w-1/2">
        <div className="w-full flex flex-col gap-5 md:border-[0.5px] md:border-[#D1D5D4] px-10 md:px-5 md:py-14 md:rounded-md sm:w-1/2">
          <FormHeader title="Witamy w Carfit" subtitle="Załóż konto"/>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[#333] text-xs">Full name</label>
              <input
                {...register('name')}
                type="text"
                id="name"
                placeholder="Jacky Macky"
                className="border border-[#CCCCCC] w-full px-2 py-2 text-[#111] text-sm rounded-md focus:outline-none focus:border-[#007AFF]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-[#333] text-xs">Phone</label>
              <input
                type="string"
                {...register('phone')}
                id="email"
                placeholder="111111222"
                className="border border-[#CCCCCC] w-full px-2 py-2 text-[#111] text-sm rounded-md focus:outline-none focus:border-[#007AFF]"
              />
            </div>
          
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[#333] text-xs">Email</label>
              <input
                type="email"
                {...register('email')}
                id="email"
                placeholder="carfit@gmail.com"
                className="border border-[#CCCCCC] w-full px-2 py-2 text-[#111] text-sm rounded-md focus:outline-none focus:border-[#007AFF]"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-[#333] text-xs">Password</label>
              <input
                {...register('password')}
                type="password"
                id="password"
                placeholder="***********"
                className="border border-[#CCCCCC] w-full px-2 py-2 text-[#111] text-sm rounded-md focus:outline-none focus:border-[#007AFF]"
              />
            </div>

            <button className={cn("w-full bg-[#111] text-white flex py-3 justify-center items-center rounded-md font-medium text-xs mt-2", formState.isSubmitting && "bg-[#333]")}>Utwórz konto</button> 
          
            <p className="text-red-500 text-xs">{error}</p>
          </form>
          
          <div className="flex flex-col gap-10">
            <p className="text-xs text-[#333] text-pretty font-extralight tracking-wide">By clicking <b>Log in</b> you acknowledge you have read, understood and agree for our 
            <span className="text-xs font-normal text-[#333]"> Polityka i regulamin</span></p>
            <p className="text-center text-[#333] text-sm font-light">Masz już konto?
              <Link href='/sign-in'><span className="text-[#007AFF] font-semibold"> Zaloguj</span></Link>
            </p>
          </div>
    </div>

    </div>
      {/* IMAGES FOR BIG SCREEN SIZES */}
      <div className="w-1/2 text-white  hidden lg:block"> 
        <Image src={login_image} alt="login image" className="h-full object-cover"/>
      </div>
    </div>
  );
}

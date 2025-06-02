'use client'
import Link from "next/link";
import Image from "next/image";
import login_image from "@/../public/login_image.jpg"
import { ArrowLeft } from "lucide-react";
import FormHeader from "@/components/form-header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { cn } from "@/utils"

type LoginData = {
  email: string
  password: string
}

export default function SignIn() {
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const {register, handleSubmit, formState} = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  
  const onSubmit = async (data: LoginData) => {
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
        router.push('/')
        }else{
          setError(responseData.error)
        }
      } catch{
        setError("There was a problem with your login");
      }
    };


  return (
    <div className="w-full min-h-svh flex xl:flex-row">
      <Link href="/">
        <div className="hidden w-fit absolute bg-[#111] rounded-md hover:bg-[#222222] border p-1 xl:block xl:left-[80px] xl:top-[40px]">
          <ArrowLeft color="#FFFFFF" className="size-7"/>
        </div>
      </Link>
      
      <div className="w-full bg-[#FDFCFF] flex flex-col items-center justify-center lg:w-1/2">
        <div className="w-full flex flex-col gap-5 sm:w-[320px] sm:rounded-lg md:border-[0.5px] md:border-[#D1D5D4] px-10 md:px-5 md:py-14">
          <FormHeader title="Witaj ponownie" subtitle="Zaloguj się do swojego do konta"/>
          
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[#333] text-xs">Email</label>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="carfit@gmail.com"
                className="border border-[#CCCCCC] w-full px-2 py-2 text-[#111] text-sm rounded-md focus:outline-none focus:border-[#007AFF] "
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

            <button
              className={cn("w-full bg-[#111] text-white flex py-3 justify-center items-center rounded-md font-medium text-xs mt-2",
                formState.isSubmitting && "bg-[#333]")}
            >
              Zaloguj
            </button>  

            <p className="text-red-500 text-xs">{error}</p>
          </form>
        
          <p className="text-center text-[#333] text-sm font-light">Nie masz konta?
            <Link href='/onboarding'><span className="text-[#007AFF] font-semibold"> Utwórz</span></Link>
          </p>
        </div>
      </div>

      {/* IMAGES FOR BIG SCREEN SIZES */}
      <div className="w-1/2 text-white  hidden lg:block"> 
        <Image src={login_image} alt="login image" className="h-full object-cover"/>
      </div>
    </div>
  );
}
'use client'
import Image from "next/image";
import login_image from "../../../../../public/login_image.jpg"
import Link from "next/link";
import FormHeader from "@/components/form-header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { businessSignIn } from "@/lib/auth";
import { AuthFormLabel } from "@/components/auth-form-input";

export default function SignIn() {
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  
  type FormData =   {
    email: string
    password: string
  }
  
    const {register, handleSubmit} = useForm<FormData>({
      defaultValues: {
        email: '',
        password: ''
      }
    })
  
    const onSubmit = async (data: FormData) => {
      const response = await businessSignIn(data);
      try {
        if (response.success) {
          router.push('/dashboard');
        } else {
          setError(response.error);
        }
      }catch {
        setError(response.error)
      }
    }
    
    return (
      <div className="w-full h-screen flex flex-row">
        {/* LEFT SIDE */}
        <div className="w-full flex flex-col items-center justify-center lg:px-20 lg:w-1/2">
          <Link href="/">
            <h1 className="w-full absolute text-xl font-medium top-10 left-10 hover:cursor-pointer">Carfit</h1>
          </Link>

          <form 
            className="flex flex-col px-10 py-10 gap-5 rounded-lg
            sm:w-[370px] sm:shadow-[0px_0px_35px_5px_#D4D4D4]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormHeader title="Witaj" subtitle="Zaloguj się do swojego konta biznesowego"/>

            <div className="flex flex-col gap-1">
              <AuthFormLabel
                label="Email"
                htmlFor="email"
                inputPlaceholder="email@gmail.com"
                inputId="email"
                register={register('email')}
                inputType="email"
              />

              <p className="block text-red-500 text-xs">{error}</p>

              <AuthFormLabel
                label="Hasło"
                htmlFor="password"
                inputPlaceholder="***********"
                inputId="password"
                register={register('password')}
                inputType="password"
              />

              <button className="text-white w-full flex bg-[#111111] py-2 justify-center items-center gap-3 rounded-[7px] font-medium text-sm mt-[25px]">Log in</button>  
            </div>
            
            <div>
              <p className="text-xs text-[#333] text-pretty font-extralight tracking-wide">Klikając <b>Zaloguj</b> potwierdzasz, że przeczytałeś, rozumiesz i zgadzasz się z naszą polityką i regulaminem.
                <span className="text-xs font-normal text-[#333]"> Polityka prywatności i regulamin
              </span></p>
              <p className="mt-[25px] text-center text-[#333333] text-xs font-light">Nie masz konta?
                <Link href='/business/onboarding'><span className="text-blue-900 font-semibold ml-1">Utwórz</span></Link>
              </p>
            </div>
          </form>
        </div>

      {/* IMAGES FOR BIG SCREEN SIZES */}
      <div className="w-1/2 text-white  hidden lg:block"> 
        <Image src={login_image} alt="login image" className="h-full object-cover"/>
      </div>
    </div>
  );
}

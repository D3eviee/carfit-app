'use client'
import { sendSupportTicket } from "./actions";
import { SupportFormSchema, supportFormSchema } from "@/lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { SupportInput } from "@/components/support-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SupportTextarea } from "@/components/support-textarea";
import { useState } from "react";

export default function Support() {
  const [message, setMessage] = useState<{success:boolean | null, message:string}>({success:null, message: "" })

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, setValue, reset} = useForm<SupportFormSchema>({
    resolver: zodResolver(supportFormSchema),
  });
  
  //HANDLING FORM FUNCION
  const onSubmit: SubmitHandler<SupportFormSchema> = async (data) => {
    const res = await sendSupportTicket(data)
    setMessage(res)

    if(res.success) reset()
  }

  return (
    <div className="mt-14 w-full flex flex-col gap-10 px-4 z-0 md:px-10 md:flex-row md:gap-24  md:mt-32 xl:px-32  xl:gap-24 2xl:px-64 2xl:gap-24 "> 
      {/* PAGE HEADINGS */}
      <div className="w-full flex flex-col gap-2.5">
        <h1 className="text-[#111] text-3xl font-semibold">Daj nam znać</h1>
        <p className="texx-[#111] text-base font-light">Jesteśmy tutaj, aby Ci pomóc! Jeśli masz pytania, napotkałeś problem techniczny lub potrzebujesz wsparcia przy korzystaniu z naszego serwisu, skontaktuj się z nami za pomocą formularza kontaktowego lub napisz bezpośrednio na nasz adres e-mail. Odpowiemy tak szybko, jak to możliwe!</p>
      </div>

      {/* CONTACT FORM */}
      <div className="w-full">
        <form 
          className="flex flex-col gap-10 w-full lg:bg-white lg:drop-shadow-md lg:rounded-xl lg:p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl text-[#111] font-medium">Napisz od nas</h2>
          <div className="flex flex-col gap-10">
            <SupportInput
              htmlFor="name"
              inputId="name"
              inputPlaceholder=""
              inputType="text"
              register={register("name")}
              label="Imię"
              error={formState.errors.name?.message}
            />

            <SupportInput
              htmlFor="email"
              inputId="email"
              inputPlaceholder=""
              inputType="email"
              register={register("email")}
              label="Email"
              error={formState.errors.email?.message}
            />

            <SupportInput
              htmlFor="title"
              inputId="title"
              inputPlaceholder=""
              inputType="text"
              register={register("title")}
              label="Tytuł"
              error={formState.errors.title?.message}
            />

            <SupportTextarea
              htmlFor="content"
              inputId="content"
              register={register("content")}
              label="Treść"
              error={formState.errors.content?.message}
            />
          </div>
          
          {message.success == false && <p className="text-red-600 text-xs font-medium">{message.message}</p>}
          {message.success == true && <p className="text-green-600 text-xs font-medium">{message.message}</p>}

          <div className="flex justify-end">
            <button 
              type="submit"
              className="w-fit px-10 py-2 rounded bg-[#111] text-white hover:bg-[#333] hover:cursor-pointer"
            >
              Wyślij
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
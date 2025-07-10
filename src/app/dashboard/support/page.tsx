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
  const { register, handleSubmit, formState, reset} = useForm<SupportFormSchema>({
    resolver: zodResolver(supportFormSchema),
  });
  
  //HANDLING FORM FUNCION
  const onSubmit: SubmitHandler<SupportFormSchema> = async (data) => {
    const res = await sendSupportTicket(data)
    setMessage(res)

    if(res.success) reset()
  }

  return (
    <div className="flex mx-auto w-full  flex-col gap-10 md:flex-row md:px-10 md:gap-12 md:pt-16 lg:px-4 xl:w-4/5"> 
      {/* PAGE HEADINGS */}
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-[#000] text-2xl font-medium leading-none">Daj nam znać</h1>
        <p className="text-[#333] text-sm font-light">Masz problem z aplikacją albo napotkałeś buga? Napisz do nas, opisz swoją sprawę a my odpowiemy jak najszybciej.</p>
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
'use client'
import { sendSupportTicket } from "./actions";
import { SupportFormSchema, supportFormSchema } from "@/lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/forms/text-input";
import TextLabel from "@/components/forms/text-label";
import { FormError } from "@/components/forms/form-error";
import { useToastStore } from "@/lib/store";

export default function SupportPage() {
  const showToast = useToastStore(store => store.showToast)

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, reset, watch} = useForm<SupportFormSchema>({
    resolver: zodResolver(supportFormSchema)
  })

  const isDisabled = !(watch("name") && watch("email") &&  watch("title") && watch("content"))
  
  // HANDLING FORM FUNCION
  const onSubmit: SubmitHandler<SupportFormSchema> = async (data) => {
    const response = await sendSupportTicket(data)
    if(!response.success){
      showToast(response.message, "error")
      return
    }
    showToast(response.message, "success")
    reset()
    return
  }

  return (
    <div className="h-full w-full mt-5 flex flex-col px-4 gap-10 md:gap-0 md:flex-row md:justify-between md:px-10 md:mt-16 xl:px-20 2xl:px-64"> 
      {/* PAGE HEADINGS */}
      <div className="w-full flex flex-col gap-1 text-pretty">
        <h1 className="text-[#191919] text-2xl font-semibold">Daj nam znać</h1>
        <p className="texx-[#191919] text-base font-light">Jesteśmy tutaj, aby Ci pomóc! Jeśli masz pytania, napotkałeś problem techniczny lub potrzebujesz wsparcia przy korzystaniu z naszego serwisu, skontaktuj się z nami za pomocą formularza kontaktowego lub napisz bezpośrednio na nasz adres e-mail. Odpowiemy tak szybko, jak to możliwe!</p>
      </div>

      {/* CONTACT FORM */}
      <div className="w-full flex flex-row items-center justify-center">
        <form 
          className="w-full flex flex-col gap-10 sm:w-[380px] lg:w-[450px] sm:px-8 sm:ring-[0.5px] sm:ring-[#D4D4D4] sm:py-8 sm:rounded-3xl sm:shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <TextLabel htmlFor="name" text="Imię" />
              <TextInput
                id="name"
                type="text"
                {...register("name")}
              />
              <FormError error={formState.errors.name?.message}/>
            </div>

            <div className="flex flex-col gap-1">
              <TextLabel htmlFor="email" text="Email" />
              <TextInput
                id="email"
                type="text"
                {...register("email")}
              />
              <FormError error={formState.errors.email?.message}/>
            </div>

            <div className="flex flex-col gap-1">
              <TextLabel htmlFor="title" text="Tytuł" />
              <TextInput
                id="title"
                type="text"
                {...register("title")}
              />
              <FormError error={formState.errors.title?.message}/>
            </div>

            <div className="flex flex-col gap-1">
              <TextLabel htmlFor="content" text="Treść" />
              <textarea
                rows={5}
                id="content"
                {...register("content")}
                className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
              ></textarea>
              <FormError error={formState.errors.content?.message}/>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              disabled={isDisabled}
              type="submit"
              className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
            >
              Wyślij
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
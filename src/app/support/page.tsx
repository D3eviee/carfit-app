'use client'
import { useActionState } from "react";
import { sendSupportTicket } from "./actions";

export default function Support() {

  const [, formAction, isPending] = useActionState(sendSupportTicket, {
    success: false,
    message: '',
  });

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
          action={formAction}
        >
          
          <h2 className="text-xl text-[#111] font-medium">Napisz od nas</h2>

          <div className="flex flex-col gap-10">
            <div className="relative flex flex-col gap-1">
              <label className="absolute left-2 -top-2.5 px-1 bg-[#FFF] text-[#333] font-light text-sm">Imię</label>
              <input type="text" name="name" className="border p-2"/>
            </div>
            
            <div className="relative flex flex-col gap-1">
              <label className="absolute left-2 -top-2.5 px-1 bg-[#FFF] text-[#333] font-light text-sm">Email</label>
              <input type="text" name="email" className="border p-2"/>
            </div>

            <div className="relative flex flex-col gap-1">
              <label className="absolute left-2 -top-2.5 px-1 bg-[#FFF] text-[#333] font-light text-sm">Tytył</label>
              <input type="text" name="title" className="border p-2"/>
            </div>

            <div className="relative flex flex-col gap-1">
              <label className="absolute left-2 -top-2.5 px-1 bg-[#FFF] text-[#333] font-light text-sm">Treść</label>
              <textarea className="border" name="message" rows={5}></textarea>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit"
              className="w-fit px-10 py-2 rounded bg-[#111] text-white hover:bg-[#333] hover:cursor-pointer"
              disabled={isPending}
            >
              {isPending ? 'Wysyłanie...' : 'Wyślij'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
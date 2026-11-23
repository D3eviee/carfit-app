import { SupportForm } from "@/components/support/SupportForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CarFit | Wsparcie",
  description: "Skontaktuj się z zespołem CarFit. Pomożemy w razie pytań lub problemów technicznych.",
}

export default function SupportPage() {
  return (
    <div className="h-full w-full mt-5 flex flex-col px-4 gap-10 md:gap-0 md:flex-row md:justify-between md:px-10 md:mt-16 xl:px-20 2xl:px-64">
      {/* PAGE HEADINGS */}
      <div className="w-full flex flex-col gap-1 text-pretty">
        <h1 className="text-[#191919] text-2xl font-semibold">Daj nam znać</h1>
        <p className="text-[#191919] text-base font-light">
          Jesteśmy tutaj, aby Ci pomóc! Jeśli masz pytania, napotkałeś problem techniczny lub potrzebujesz wsparcia przy
          korzystaniu z naszego serwisu, skontaktuj się z nami za pomocą formularza kontaktowego lub napisz bezpośrednio
          na nasz adres e-mail:{" "}
          <a href="mailto:support@car-fit.pl" className="italic">support@car-fit.pl</a>. Odpowiemy tak szybko, jak to możliwe!
        </p>
      </div>

      {/* CONTACT FORM */}
      <div className="w-full flex flex-row items-center justify-center">
        <SupportForm />
      </div>
    </div>
  )
}
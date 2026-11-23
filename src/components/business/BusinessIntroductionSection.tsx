import type { ReactNode } from "react"
import { BookCheck, LucideEdit, User2 } from "lucide-react"

const GRADIENT_ID = "business-steps-gradient"
const iconProps = { stroke: `url(#${GRADIENT_ID})`, className: "mx-auto w-14 h-14" }

type Step = { title: string; description: string; icon: ReactNode }

const STEPS: Step[] = [
  {
    title: "Utwórz konto",
    description:
      "W ciągu kilku minut utworzysz swój profil. Profil umożliwia ci stworzenie wizytówki twojego biznesu oraz obsługę rezerwacji online. Całkowicie za darmo.",
    icon: <User2 {...iconProps} />,
  },
  {
    title: "Spersonalizuj profil",
    description:
      "Po utworzeniu profilu, przygotuj wizytówkę swojego biznesu, dając możliwość klientom zapoznania się z usługami, które oferuje twój serwis.",
    icon: <LucideEdit {...iconProps} />,
  },
  {
    title: "Przyjmuj rezerwacje",
    description:
      "Po skonfigurowaniu profilu, zacznij przyjmować rezerwacje, zyskaj dostęp do analiz i rozwijaj swój biznes.",
    icon: <BookCheck {...iconProps} />,
  },
]

export const BusinessIntroductionSection = () => {
    return (
        <section className="w-full px-4 py-16 flex flex-col lg:py-25 md:px-12 lg:gap-14 xl:px-35 2xl:px-45 lg:h-full justify-between gap-10 md:gap-16">
            {/* One shared gradient for all icons */}
            <svg aria-hidden style={{ position: "absolute", width: 0, height: 0 }}>
                <defs>
                    <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ff6a00" />
                        <stop offset="50%" stopColor="#ff3b82" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>
            
            <h2 className="text-2xl tracking-tight lg:text-3xl font-bold text-pretty text-center w-full">Jak to działa?</h2>

            <div className="w-full flex flex-row gap-10 flex-wrap justify-around md:flex-row md:flex-nowrap">
                {STEPS.map((step) => (
                    <article
                        key={step.title}
                        className="w-full flex flex-col p-4 bg-[#f5f5f7] rounded-4xl inset-shadow-glass text-center gap-8 transition-all duration-150 ease-in-out hover:scale-[1.02] lg:p-8"
                    >
                        <div className="flex flex-col gap-2">
                            {step.icon}
                            <h3 className="bg-linear-to-r from-[#ff6a00] via-[#ff3b82] to-[#3b82f6] bg-clip-text text-transparent text-lg font-semibold md:text-xl md:font-bold">
                                {step.title}
                            </h3>
                        </div>
                        <p className="text-middle text-[#333] font-normal md:font-semibold md:text-base">{step.description}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
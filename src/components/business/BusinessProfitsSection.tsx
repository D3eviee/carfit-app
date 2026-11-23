'use client'
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/utils"
import { BusinessProfitsSectionItem } from "./BusinessProfitsSectionItem"

const PROFITS = [
  {
    title: "Rejestracje poza godzinami pracy",
    content: "Nie trać wizyt, które klienci umawiają poza Twoimi godzinami pracy. Pozwól klientom rezerwować wizyty o dowolnej porze 24/7.",
  },
  {
    title: "Pokaż swoje usługi i buduj zaufanie",
    content: "Prezentuj swoje usługi w przejrzysty sposób, pozwól klientom łatwo poznać ofertę i zyskać pewność, że wybierają sprawdzone rozwiązania.",
  },
  {
    title: "Oszczędzaj czas i skup się na klientach",
    content: "Zyskaj więcej czasu, dając klientom możliwość samodzielnego umawiania wizyt online nawet wtedy kiedy jesteś zajęty.",
  },
  {
    title: "Dotrzyj do nowych klientów",
    content: "Twój warsztat pojawia się w wyszukiwarce CarFit, gdy kierowcy w Twojej okolicy szukają usług, które oferujesz.",
  },
  {
    title: "Opinie, które przyciągają klientów",
    content: "Zbieraj oceny i opinie po każdej wizycie. Zadowoleni klienci polecają Cię kolejnym kierowcom.",
  },
  {
    title: "Wszystko w jednym miejscu",
    content: "Zintegruj wszystkie aspekty zarządzania biznesem w jednym miejscu, aby mieć pełną kontrolę i wygodę działania.",
  },
]

const arrowClass =
  "flex justify-center items-center bg-[#E8E8ED] duration-300 rounded-full w-9 h-9 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"

// Visible cards: 1 → 2 (md) → 3 (lg) → 4 (xl). Formula: (100% - gaps) / cards, gap-10 = 2.5rem
const cardWidthClass =
  "shrink-0 snap-start basis-full md:basis-[calc((100%-2.5rem)/2)] lg:basis-[calc((100%-5rem)/3)] xl:basis-[calc((100%-7.5rem)/4)]"

export const BusinessProfitsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const updateButtons = () => {
      setCanScrollLeft(container.scrollLeft > 1)
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 1)
    }

    updateButtons()
    container.addEventListener("scroll", updateButtons, { passive: true })
    const resizeObserver = new ResizeObserver(updateButtons)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener("scroll", updateButtons)
      resizeObserver.disconnect()
    }
  }, [])

  // Move by exactly one card (card width + gap)
  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return

    const card = container.firstElementChild as HTMLElement | null
    if (!card) return
    const gap = parseFloat(getComputedStyle(container).columnGap) || 0
    const amount = card.getBoundingClientRect().width + gap

    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section className="w-full py-14 flex flex-col gap-10 lg:py-25 md:px-12 lg:gap-14 xl:px-35 2xl:px-45 overflow-hidden">
      <div
        ref={scrollRef}
        className="w-full flex flex-row gap-10 overflow-hidden md:overflow-scroll scrollbar-none p-4 snap-x snap-mandatory scroll-px-4"
      >
        {PROFITS.map((item) => (
          <BusinessProfitsSectionItem
            key={item.title}
            title={item.title}
            content={item.content}
            className={cardWidthClass}
          />
        ))}
      </div>

      <div className="flex flex-row gap-5 justify-end px-4">
        <button
          type="button"
          aria-label="Poprzednie"
          disabled={!canScrollLeft}
          onClick={() => scroll("left")}
          className={cn(arrowClass, "shadow-md")}
        >
          <ChevronLeft color="#767679" strokeWidth={2.5} className="mr-0.5" />
        </button>
        <button
          type="button"
          aria-label="Następne"
          disabled={!canScrollRight}
          onClick={() => scroll("right")}
          className={arrowClass}
        >
          <ChevronRight color="#767679" strokeWidth={2.5} className="ml-0.5" />
        </button>
      </div>
    </section>
  )
}
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const BusinessSupportSection = () => {
  return (
    <section className="bg-[#F5F5F7] py-16 flex flex-col px-4 lg:flex-row items-center lg:py-25 md:px-12 lg:gap-14 xl:px-35 2xl:px-45 justify-between gap-10 md:gap-16">
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="w-full flex flex-col text-2xl tracking-tight lg:text-4xl font-bold text-pretty lg:gap-3">
          <span>Nigdy nie zostaniesz sam -</span>
          <span>obsługa klienta 24/7</span>
        </h2>
      </div>
      <div className="w-full lg:w-3/5">
        <Link
          href="/support"
          className="flex flex-col bg-white w-fit gap-5 p-6 sm:p-10 rounded-4xl ring-[0.5px] ring-[#EEE] transition-all duration-200 ease-in-out hover:bg-[#F9F9F9] hover:ring-2 hover:ring-[#FFF] active:scale-[0.99]"
        >
          <div className="w-full flex flex-row justify-between">
            <p className="text-2xl font-semibold text-main-black">Wsparcie CarFit</p>
            <ArrowRight strokeWidth={2} color="#363638" />
          </div>
          <p className="text-base text-main-black font-light sm:font-normal">
            Skontaktuj się z nami mailowo lub telefonicznie, a my zrobimy wszystko co w naszej mocy by Ci pomóc.
          </p>
        </Link>
      </div>
    </section>
  )
}
import Link from "next/link"
import { BusinessJoinButton } from "./BusinessJoinButton"

export const BusinessHeader = () => {
  return (
    <div className="flex flex-col gap-8 mx-auto py-20 px-4 sm:px-0 md:w-2/3 lg:w-2/3 xl:w-5/12 2xl:w-6/12 sm:py-40 md:py-35">
        <div className="w-full text-center flex flex-col items-center gap-10 ">
            <div className="w-full flex flex-col gap-4 justify-center items-center">
                <h1 className="text-main-black font-bold leading-10 text-pretty tracking-tight text-3xl sm:text-4xl lg:text-5xl lg:leading-15">
                    System do rezerwacji wizyt online i zarządzania biznesem
                </h1>
                <p className="text-[#333] px-5 text-base font-light text-pretty lg:font-normal lg:px-30">
                    Pozwól klientom rezerwować wizyty online oraz buduj bazę lojalnych klientów - wszystko w jednej aplikacji. Dołącz już dziś!
                </p>
            </div>
            <BusinessJoinButton className="lg:px-13 lg:py-3.5" />
        </div>
    </div>
  )
}
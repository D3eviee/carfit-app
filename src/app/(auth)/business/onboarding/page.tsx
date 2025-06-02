"use client";
import Image from "next/image";
import Link from "next/link";
import login_image from "../../../../../public/login_image.jpg";
import { OnboardingNav } from "@/components/onboarding/onboarding-nav";
import { useState } from "react";
import FormHeader from "@/components/form-header";
import OnboardingAdress from "@/components/onboarding/onboarding-address";
import OnboardingBusienssInformation from "@/components/onboarding/onboarding-business-info";
import OnboardingWorkingDays from "@/components/onboarding/onboarding-days";
import OnboardingEmail from "@/components/onboarding/onboarding-email";
import OnboardingCategory from "@/components/onboarding/onboarding-category";
import OnboardingDescription from "@/components/onboarding/onboarding-description";

export default function Onboardoarding() {
  const [activePage, setActivePage] = useState<number>(0)

  const formHeadings = [
    {
      title: "Witamy w CarFit",
      subtitle: "Stwórz konto dla swojego biznesu i pozwól mu rosnąć",
    },
    {
      title: "Jaki rodzaj biznesu prowadzisz?",
      subtitle:
        "Wybierz kategorię, która najlepiej opisuje usługi, które dostarczasz.",
    },
    {
      title: "Informacje o biznesie",
      subtitle: "Dostarcz informację o właścicielu i biznesie",
    },
    { title: "Adres ", subtitle: "Gdzie znajduje się twój biznes?" },
    { title: "Opis ", subtitle: "Opowiedz nam o swoim biznesie" },
    {
      title: "Czas pracy",
      subtitle: "Daj znać klientom, w jakich dniach pracujesz",
    },
  ];

  return (
    <div className="w-full min-h-svh flex xl:flex-row lg:1/2">
      {/*LEFT SIDE FORM*/}
      <div className="w-full  flex flex-col items-center justify-center lg:w-1/2">
        {/*BACK BUTTON*/}
        <Link href="/">
          <h1 className="w-full absolute text-xl font-medium top-10 left-10 hover:cursor-pointer">
            Carfit
          </h1>
        </Link>

        {/*FORM*/}
        <div className="flex flex-col px-10 py-10 gap-5 rounded-lg sm:w-[370px] sm:shadow-[0px_0px_35px_5px_#D4D4D4]">
          {/*FORM NAVIGATION*/}
          {activePage !== 0 && (
            <OnboardingNav onClick={() => setActivePage((prev) => prev - 1)} />
          )}

          {/*FORM HEADER*/}
          <FormHeader
            title={formHeadings[activePage].title}
            subtitle={formHeadings[activePage].subtitle}
          />

          {activePage == 0 && (
            <OnboardingEmail
              onClick={() => setActivePage((prev) => prev + 1)}
            />
          )}
          {activePage == 1 && (
            <OnboardingCategory
              onClick={() => setActivePage((prev) => prev + 1)}
            />
          )}
          {activePage == 2 && (
            <OnboardingBusienssInformation
              onClick={() => setActivePage((prev) => prev + 1)}
            />
          )}
          {activePage == 3 && (
            <OnboardingAdress
              onClick={() => setActivePage((prev) => prev + 1)}
            />
          )}
          {activePage == 4 && (
            <OnboardingDescription
              onClick={() => setActivePage((prev) => prev + 1)}
            />
          )}
          {activePage == 5 && <OnboardingWorkingDays />}
        </div>
      </div>

      {/* IMAGES FOR BIG SCREEN SIZES */}
      <div className="w-1/2 text-white  hidden lg:block">
        <Image
          src={login_image}
          alt="login image"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
}

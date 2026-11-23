'use client'
import { useState } from "react";
import { BookingLoginForm } from "../booking/booking-login-form";
import { BookingSignupForm } from "../booking/booking-signup-form";
import { ModalButtonBack } from "../buttons/modal-back-button";
import { FormSwitcher } from "../form-switcher";

export const BookinLoginModal = () =>  {
  //state for displaying correct form
  const [formType, setFormType] = useState<2 | 1>(1)
  
  return (
    <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[400px] sm:h-fit sm:rounded-2xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      <div className="w-full px-4">
        <ModalButtonBack/>
      </div>

      <div className="px-8 flex flex-col gap-10">
        <div className="flex flex-col text-pretty gap-2.5">
          <h1 className="text-2xl text-black font-medium leading-none text-center">Zaloguj się lub zarejestruj</h1>
          <p className="text-sm text-black font-normal leading-4.5 text-center">Tylko zalogowani użytkownicy mogą dokonywać rezerwacji</p>
        </div>
        
        {formType == 1 && <BookingLoginForm/> }
        {formType == 2 && <BookingSignupForm /> }

        <FormSwitcher currentForm={formType}  onSwitch={setFormType}  />
      </div>
    </div>
  )
}
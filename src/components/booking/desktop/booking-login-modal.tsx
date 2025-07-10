'use client'
import { useState } from "react";
import { BookingLoginForm } from "../booking-login-form";
import { BookingSignupForm } from "../booking-signup-form";
import { BookingModalProvider } from "./booking-modal-provider";

type BookingLoginModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const BookingLoginModal = ({isOpen, onClose}: BookingLoginModalProps) =>  {
  //state for displaying correct form
  const [form, setForm] = useState(1)

  const handleClosingModal =  () =>  {
    document.body.style.overflow = ""
    onClose()
  }

  return (
    <BookingModalProvider
        isOpen={isOpen}
        onClose={handleClosingModal}
        
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl text-[#000] font-semibold leading-none">Zaloguj się lub zarejestruj</h1>
          <p className="text-sm text-[#191919] font-normal leading-none">Zaloguj się lub utwórz konto aby zakończyć rejestrację</p>
        </div>
        
        {form == 1 && <BookingLoginForm onClose={handleClosingModal} changeFormFn={() => setForm(2)}/> }
        {form == 2 && <BookingSignupForm onClose={handleClosingModal} changeFormFn={() => setForm(1)}/> }
      </div>
    </BookingModalProvider>
  )
}
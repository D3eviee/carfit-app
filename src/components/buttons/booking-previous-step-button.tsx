"use client";
import { ButtonBack } from "./ButtonBack";

type BookingPreviousStepButtonProps = {
  bookingStep: number
  previouStepFn: () => void
}

export const BookingPreviousStepButton = ({bookingStep, previouStepFn}:BookingPreviousStepButtonProps) => {    
  if(bookingStep == 1) return null
  return  <ButtonBack onBackFn={previouStepFn}/>
}
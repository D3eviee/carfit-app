'use client'
import { ChevronLeft} from "lucide-react";

type BookingBackButtonProps = {
    bookingStep: number
    previouStepFn: () => void
}

export const BookingBackButton = ({bookingStep, previouStepFn}:BookingBackButtonProps) => {

    const handlePrevStep = () => {
        previouStepFn()
    }

    if(bookingStep == 1) return null

    return (
    <div 
        onClick={handlePrevStep}
        className="w-fit backdrop-blur-lg rounded-full shadow-inner-glass border-[0.5px] ring-1 ring-[#FFF] p-2 active:scale-105 transition duration-75 ease-in">
        <ChevronLeft color="#000" size={25} strokeWidth={2}/>
    </div>
    )
}
'use client'
import { X } from "lucide-react";
import { BookingAbortBookingModal } from "./booking-abort-booking-modal";
import { useState } from "react";

export const BookingCloseButton = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
    <>
         <div 
            onClick={() => setIsModalOpen(true)}
            className="absolute right-4 top-4 backdrop-blur-lg rounded-full shadow-inner-glass border-[0.5px] ring-1 ring-[#FFF] p-2 active:scale-105 transition-all duration-75 ease-in hover:cursor-pointer hover:bg-[#F2F2F7]"
        >
            <X color="#000" size={25} strokeWidth={1.5}/>
            
        </div>

        <BookingAbortBookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
    </>
    )
}
'use client'
import { useState } from "react"
import { ServicesCategory } from "@/lib/types";
import ServiecAddServiceModal from "./services-add-service-modal";

export function AddServiceButton({categories}:{categories: ServicesCategory[]}){
    // STATE FOR MANAGING OPENING MODAL
    const [isOpen, setIsOpen] = useState(false)

    const hanldeOpeningModal = () => {
        document.body.style.overflow = "hidden" 
        setIsOpen(true)
    }

    const handleClosingModal = () => {
        document.body.style.overflow = "" 
        setIsOpen(false)
    }

    return(
    <>
      <button 
        type="button" 
        className="bg-[#111] text-white font-medium text-sm py-1 px-3 rounded-[5px] hover:bg-[#111] hover:cursor-pointer" 
        onClick={hanldeOpeningModal}
        >
        Dodaj usługę
        </button>
        <ServiecAddServiceModal open={isOpen} onClose={handleClosingModal} categories={categories}/>
      </>
    )
  }

 
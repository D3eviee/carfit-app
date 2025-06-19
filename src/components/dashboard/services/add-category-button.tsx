"use client";
import { useState } from "react";
import { ServicesAddCategoryModal } from "./services-add-category-modal";

export function AddCategoryButton() {
  // STATE FOR MANAGING OPENING MODAL
  const [isOpen, setIsOpen] = useState(false);

  const hanldeOpeningModal = () => {
    document.body.style.overflow = "hidden" 
    setIsOpen(true)
  }

  const handleClosingModal = () => {
    document.body.style.overflow = "" 
    setIsOpen(false)
  }

  return (
    <>
      {/* OPEN CATEGORY MODAL BUTTON */}
      <p 
        className="text-sm text-white font-medium py-1 px-2 rounded-[5px] bg-[#111] hover:cursor-pointer hover:bg-[#111]"  onClick={hanldeOpeningModal}>
        Utwórz
      </p>

      {/* ADD CATEGORY MODAL */}
      <ServicesAddCategoryModal isOpen={isOpen} onClose={handleClosingModal}/>
    </>
  );
}
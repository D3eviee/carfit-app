"use client";
import { useState } from "react";
import { ServicesAddCategoryModal } from "./services-add-category-modal";
import { Plus } from "lucide-react";

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
      <div className="font-medium p-0.5 rounded-md bg-[#111] hover:cursor-pointer hover:bg-[#333]"  onClick={hanldeOpeningModal}>
        <Plus size={18} color="white" strokeWidth={2}/>
      </div>

      {/* ADD CATEGORY MODAL */}
      <ServicesAddCategoryModal isOpen={isOpen} onClose={handleClosingModal}/>
    </>
  );
}
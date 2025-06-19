'use client'
import SettingDeleteImageModal from "./settings-delete-image-modal"
import { useState } from "react"

export default function SettingsGalleryGridItemDeleteButton({id}:{id:string}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpeningModal = () => {
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const handleClosingModal = () => {
    document.body.style.overflow = ""
    setIsOpen(false)
  }

  return ( 
    <>
      <button 
        className='h-fit bg-[#FF453A] text-white py-1 rounded shadow-black border hover:bg-[#EE3420] hover:cursor-pointer'
        onClick={handleOpeningModal}
      >Delete
      </button>  

      <SettingDeleteImageModal isOpen={isOpen} close={handleClosingModal} imageId={id}/>
    </>
  )
}
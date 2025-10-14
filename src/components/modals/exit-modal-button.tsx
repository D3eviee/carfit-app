'use client'
import { useModalStore } from "@/lib/store"

export const ExitModalButton = () =>  {
  const closeModal = useModalStore(store => store.closeModal)
  return (
    <button 
        type="button"
        onClick={closeModal}
        className="w-full text-center justify-center py-2.5 bg-[#E0E0E2] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#D0D0D1] active:scale-xs transition duration-75"
    >
        <p className="text-main-black">Wyjdź</p>
    </button>
  )
}
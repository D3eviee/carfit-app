'use client'
import { logout } from "@/lib/auth"
import { useMobileNavigationStore, useModalStore, useToastStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { ExitModalButton } from "./exit-modal-button"

export const LogoutModal = () => {
    const router = useRouter()
    const showToast = useToastStore(store => store.showToast)
    const closeModal = useModalStore(store => store.closeModal)
    const closeMenu = useMobileNavigationStore(store => store.closeMenu)

    const handleLogout = async () => {
        await logout()
        router.push('/')
        closeModal()
        closeMenu()
        showToast("Wylogowano", "success")
    }
    
    return (
        <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
            <p className="text-main-black text-middle leading-none font-semibold">Czy napewno chcesz zostać wylogowanym?</p>
            <div className="w-full flex flex-row gap-2.5">
                <ExitModalButton/>
                <div 
                    onClick={() => handleLogout()}
                    className="w-full text-center justify-center py-2.5 bg-[#F95A59] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#E84948] active:scale-105"
                >
                    <p className="text-[#FFF]">Wyloguj</p>
                </div>
            </div>
        </div>
  )
}
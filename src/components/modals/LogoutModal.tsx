'use client'
import { logout } from "@/lib/auth"
import { useMobileNavigationStore, useModalStore, useToastStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { ExitModalButton } from "./exit-modal-button"
import { useTransition } from "react"

export const LogoutModal = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const showToast = useToastStore((store) => store.showToast)
  const closeModal = useModalStore((store) => store.closeModal)
  const closeMenu = useMobileNavigationStore((store) => store.closeMenu)
  
  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logout()
      } catch {
        showToast("Nie udało się wylogować. Spróbuj ponownie", "error")
        return
      }

      closeModal()
      closeMenu()
      router.replace("/")
      router.refresh()
      showToast("Wylogowano", "success")
    })
  }
  
  return (
    <div className="flex w-[min(360px,calc(100vw-32px))] flex-col gap-8 rounded-4xl bg-[#F2F2F7] px-4 pb-4 pt-8">
      <p className="text-middle font-semibold leading-tight text-main-black">Czy na pewno chcesz się wylogować?</p>

      <div className="flex w-full flex-row gap-2.5">
        <ExitModalButton/>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          className="w-full rounded-2xl bg-[#F95A59] py-2.5 text-white shadow-bnw-y-small hover:bg-[#E84948] active:scale-xs disabled:opacity-60 cursor-pointer text-xs"
        >
          {isPending ? "Wylogowywanie…" : "Wyloguj"}
        </button>
      </div>
    </div>
  )
}
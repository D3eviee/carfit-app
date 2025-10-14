'use client'
import { useModalStore, useToastStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { ExitModalButton } from "../../exit-modal-button";
import { deleteBusinessAccount } from "@/app/dashboard/profile/actions";

export const DashboardProfileDeleteAccountModal = () => {
  const router = useRouter()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const handleDeletingAccount = async () => {
    const result = await deleteBusinessAccount()
    if(!result.success){
      showToast(result.message, "error")
      return null
    }

    closeModal()
    router.push("/")
    showToast(result.message, "success")
  }

  return(
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <div className="flex flex-col gap-2.5 px-2">
        <p className="text-main-black text-middle leading-none font-semibold">Czy napewno chcesz usunąć konto?</p>
        <p className=" text-main-black text-sm leading-5">Wraz z usunięciem konta wszyskie dane zostaną utracone. Czynność ta jest nieodwracalna.</p>
      </div>
      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton />
        <div 
          onClick={handleDeletingAccount}
          className="w-full text-center justify-center py-2.5 bg-[#F95A59] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#E84948] active:scale-xs transition duration-75"
        >
          <p className="text-[#FFF]">Usuń</p>
        </div>
      </div>
    </div>
  )
}
'use client'
import { deleteAccount } from "@/app/dashboard/profile/actions"
import { useRouter } from "next/navigation"
import { createPortal } from "react-dom"

type ProfileChangePasswordModalProps = {
    open: boolean,
    onClose: () => void
}

export const ProfileDeleteAccountModal = ({open, onClose}:ProfileChangePasswordModalProps) => {
    const router = useRouter()

    const handleDelete =  async () => {
        const result = await deleteAccount()
        if(result.success) router.push("/") 
    }

    // handling closing modal
    const handleClose = () => {
        onClose()
    }
    
    if (!open) return null
    return createPortal(
        <div className="fixed top-0 left-0 w-full h-lvh z-10">
            {/* OVERLAY  */}
            <div className=" w-full h-full bg-[#000] opacity-65" />
            {/* CONTENT  */}
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full z-20 px-4 sm:w-[380px] xl:w-[450px]">
                <div className="w-full flex flex-col gap-6 bg-[#FFF] rounded-md p-6">
                    {/* header */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-md text-[#111] font-medium leading-none">Usuń konto</h1>
                        <p className="text-sm text-[#333] font-light leading-1">Wraz z usunięciem konta wszyskie dane zostaną utracone. Czynność ta jest nieodwracalna.</p>
                    </div>

                    {/* buttons */}
                    <div className="flex flex-row justify-end gap-5">
                        <button onClick={handleClose}  className="text-sm text-[#333] px-4 py-1.5 rounded-md bg-[#F2F4F8] border border-[#D4D4D4] hover:cursor-pointer">Anuluj</button>
                        <button  onClick={handleDelete} className="text-sm font-medium  bg-[#FF5F58] min-w-28 text-white py-1.5 px-7 rounded-md">Usuń</button> 
                    </div>
                </div>
            </div>
        </div>,
    document.body
  )
}
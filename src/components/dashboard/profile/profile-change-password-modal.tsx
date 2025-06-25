'use client'
import { changePassword } from "@/app/dashboard/profile/actions"
import { Spinner } from "@/components/spinner"
import { ChangePasswordInput, changePasswordSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"

type ProfileChangePasswordModalProps = {
    open: boolean,
    onClose: () => void
}

export const ProfileChangePasswordModal = ({open, onClose}:ProfileChangePasswordModalProps) => {
    // state for error
    const [serverError, setServerError] = useState<string | null>(null)


    const {register, handleSubmit, formState : {isSubmitting, errors}, reset} = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema)
    })
    
    // handling changing password
    const onSubmit = async (data: ChangePasswordInput) => {
        const result = await changePassword(data)
        
        if (!result.success) {
            if (typeof result.message === "string") setServerError(result.message)
            else setServerError("Popraw błędy formularza")
            return
        }

        setServerError(null)
        reset()
        onClose()
    }

    // handling closing modal
    const handleClose = () => {
        reset()
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
                        <h1 className="text-md text-[#111] font-medium leading-none">Utwórz nowe hasło</h1>
                        <p className="text-sm text-[#333] font-light leading-1">Twoje hasło musi składać się przynajmniej z 8 znaków.</p>
                    </div>

                    {/* fields */}
                    <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label 
                                    htmlFor="currentPassword"
                                    className="text-sm text-[#333] font-normal leading-none"
                                >
                                    Aktualne hasło
                                </label>
                                <input 
                                    type="password" 
                                    id="currentPassword" 
                                    {...register("currentPassword")} 
                                    className="border px-2 py-1 rounded-sm outline-none" 
                                /> 
                                {errors.currentPassword && <p className="text-xs text-[#FF5F58]">{errors.currentPassword.message}</p>}
                            </div>

                            

                            <div className="flex flex-col gap-2">
                                <label 
                                    htmlFor="newPassword"
                                    className="text-sm text-[#333] font-normal leading-none"
                                >
                                    Nowe hasło
                                </label>
                                <input 
                                    type="password" 
                                    id="newPassword" 
                                    {...register("newPassword")} 
                                    className="border px-2 py-1 rounded-sm outline-none" 
                                /> 
                                {errors.newPassword && <p className="text-xs text-[#FF5F58]">{errors.newPassword.message}</p>}
                            </div>
                    
                            <div className="flex flex-col gap-2">
                                <label 
                                    htmlFor="newPassword"
                                    className="text-sm text-[#333] font-normal leading-none"
                                >
                                    Potwierdź nowe hasło
                                </label>
                                <input 
                                    type="password" 
                                    id="repaeatNewPassword"
                                    {...register("repeatNewPassword")} 
                                    className="border px-2 py-1 rounded-sm outline-none"   
                                /> 
                                {errors.repeatNewPassword && <p className="text-xs text-[#FF5F58]">{errors.repeatNewPassword.message}</p>}
                            </div>
                        
                            {/* dispalying error */}
                            {serverError &&  <p className="text-sm text-[#FF5F58]">{serverError}</p> }
                        </div>

                        {/* buttons */}
                        <div className="flex flex-row justify-between">
                            <button
                                onClick={handleClose} 
                                type="button" 
                                value="Anuluj" 
                                className="text-sm text-[#333] px-4 py-1.5 rounded-md bg-[#F2F4F8] border border-[#D4D4D4] hover:cursor-pointer"
                            >Anuluj</button>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="text-sm bg-[#111] min-w-28 text-white py-1.5 px-7 rounded-md"
                            >{isSubmitting ? <Spinner/> : "Zapisz"}</button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>,
    document.body
  )
}
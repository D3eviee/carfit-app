'use client'
import { changePersonalData } from "@/app/dashboard/profile/actions"
import { Spinner } from "@/components/spinner"
import { ChangePersonalDataInput, changePersonalDataSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"

type ProfileChangePasswordModalProps = {
    open: boolean
    onClose: () => void
    profileData: {
        email: string
        name: string
        phone: string
    }
}

export const ProfileEditProfileModal = ({open, onClose, profileData}:ProfileChangePasswordModalProps) => {
    const queryClient = useQueryClient()
    const wasOpened = useRef(false)

    const {register, handleSubmit, formState : {isSubmitting, errors}, reset} = useForm<ChangePersonalDataInput>({
        resolver: zodResolver(changePersonalDataSchema),
        defaultValues: {
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone
        }
    })

    // reset form after opening
    if (open && !wasOpened.current) {
        reset({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone
        })
        wasOpened.current = true
    }

    // after closing, changer mark
    if (!open && wasOpened.current) {
        wasOpened.current = false
    }
    
    const { mutate } = useMutation({
        mutationKey: ["updatePersonalData"],
        mutationFn: async (data: ChangePersonalDataInput) => {
            const result = await changePersonalData(data)
            return result
        }
    })

    // handling changing personal information
    const onSubmit = (data: ChangePersonalDataInput) => {
        mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["getSidebarNavigationProfileData"]})
                onClose()
                reset() 
        }})
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
                        <h1 className="text-md text-[#111] font-medium leading-none">Zmień dane </h1>
                        <p className="text-sm text-[#333] font-light leading-1">Zarządzaj swoim danymi.</p>
                    </div>

                    {/* fields */}
                    <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label 
                                    htmlFor="name"
                                    className="text-sm text-[#333] font-normal leading-none"
                                >Imię i nazwisko</label>
                                <input
                                    type="text" 
                                    id="name" 
                                    {...register("name")} 
                                    className="border px-2 py-1 rounded-sm outline-none" 
                                /> 
                                {errors.name && <p className="text-xs text-[#FF5F58]">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label 
                                    htmlFor="email"
                                    className="text-sm text-[#333] font-normal leading-none"
                                >
                                    E-mail
                                </label>
                                <input 
                                    type="text" 
                                    id="email" 
                                    {...register("email")} 
                                    className="border px-2 py-1 rounded-sm outline-none" 
                                /> 
                                {errors.email && <p className="text-xs text-[#FF5F58]">{errors.email.message}</p>}
                            </div>
                    
                            <div className="flex flex-col gap-2">
                                <label 
                                    htmlFor="phone"
                                    className="text-sm text-[#333] font-normal leading-none"
                                >
                                    Numer telefonu
                                </label>
                                <input
                                    type="text" 
                                    id="phone"
                                    {...register("phone")} 
                                    className="border px-2 py-1 rounded-sm outline-none"   
                                /> 
                                {errors.phone && <p className="text-xs text-[#FF5F58]">{errors.phone.message}</p>}
                            </div>
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
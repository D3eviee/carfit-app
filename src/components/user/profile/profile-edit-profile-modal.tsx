'use client'
import { deleteUserProfilePhoto, updateUserData } from "@/app/user/actions";
import { FormLabel } from "@/components/form-label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import default_user_image from '@/../public/default_user_image.png'
import { ChangePersonalDataInput, changePersonalDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";

type ProfileEditProfileModalProps = {
  isOpen: boolean
  onClose: () => void
  userData: {
    id: string
    phone: string
    email: string
    image: string
    name: string                
  }
}


export default function ProfileEditProfileModal({isOpen, onClose, userData}:ProfileEditProfileModalProps){
  const { name, image, email, phone } = userData
  const queryClient = useQueryClient()
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"]
  const [error, setError] = useState("")

  const handleUpload = async (e) => {
    const file = e.target.files[0]

    if (!validFileTypes.includes(file.type)) {
      setError("File must be JPG/PNG format")
      return
    }
  
    const form = new FormData()
    form.append('image', file)
    mutate(form)
  }

  const {register, getValues, formState, handleSubmit} = useForm<ChangePersonalDataInput>({
    resolver: zodResolver(changePersonalDataSchema),
    defaultValues: {
      name: name,
      email: email,
      phone: phone,
    }
  })

  const {mutate, error:mutationError, isPending} = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: async (data:FormData) => {
      try {
        await fetch("/api/uploadImage", {
          method: "POST",
          body: data
        })
  
        return 
      } catch (err) {
        return { err }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["userProfileData"]})
    })

  const {mutate: deleteImage} = useMutation({
    mutationKey: ["deleteImage"],
    mutationFn: async () => {
      try {
        await deleteUserProfilePhoto()
      } catch (err) {
        return {err}
      }
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["userProfileData"]})
    })

  const {mutate: saveProfileDataMatation} = useMutation({
    mutationKey: ["edit"],
    mutationFn: async () => {
      const data = getValues()
      updateUserData(data)
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["userProfileData"]})
      onClose()
    }
  })
  
  const onSubmit: SubmitHandler<ChangePersonalDataInput> = async () => {
    return await saveProfileDataMatation()
  }

  if(!isOpen) return 
  
  return(
  createPortal(
    <div className="fixed top-0 left-0 w-full h-dvh mx-auto my-auto flex justify-center items-center px-4">
      {/* BOX WITH BG FOR CONTENT */}
      <div className="w-full bg-white rounded-md flex flex-col gap-5 px-4 py-5 max-w-[500px] sm:p-8">
        {/* NAV */}
        <div className="flex flex-row justify-end">
            <div 
              onClick={onClose}
              className="w-fit backdrop-blur-lg rounded-full shadow-inner-glass border-[0.5px] ring-1 ring-[#FFF] p-2 active:scale-105 transition-all duration-75 ease-in hover:cursor-pointer hover:bg-[#F2F2F7]"
            >
              <X color="#000" size={25} strokeWidth={1.5}/>
            </div>
        </div>

        {/* CONTENT */}
        
        <div className="flex flex-row gap-8 items-center">
          <div className="relative w-24 h-24 rounded-full border overflow-hidden">
          { isPending 
            ? <Spinner/> 
            : <Image
              src={image || default_user_image}
              fill
              className="object-cover rounded-full"
              alt="Profile photo"
              />
          } 
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-5">
              <label className="text-white rounded-lg border-none outline-none  text-sm px-2 border bg-[#8A8A8E] hover:bg-[#9A9A9E] hover:cursor-pointer inline-flex items-center">
                Wybierz
                <input type="file"  hidden onChange={handleUpload} disabled={isPending} onClick={() => setError("")} />
              </label>
              <div 
                onClick={() => deleteImage()}
                className="h-fit bg-red-400/60 text-red-800 px-5 py-1.5 text-center rounded-lg hover:cursor-pointer"
              >
                Usuń
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              {error && <p className=" text-red-600 text-sm font-extralight">{error}</p>}
              {mutationError && <p className=" text-red-600 text-sm font-extralight">{mutationError.message}</p>}
            </div> 
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="name" text="Imię i nazwisko"/>
             <input 
              id="name"
              {...register("name")}
              type="text"
              className="bg-[#F2F2F7] w-full px-2 py-2 text-base text-[#000] rounded-xl border-[0.5px] border-transparent outline-none focus:border-[#D4D4D4] shadow-sm md:py-3.5 md:rounded:lg"
            />
            {formState.errors.name && <p className="text-sm text-red-600">{formState.errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="email" text="Email"/>
             <input 
              id="email"
              {...register("email")}
              type="text"
              className="bg-[#F2F2F7] w-full px-2 py-2 text-base text-[#000] rounded-xl border-[0.5px] border-transparent outline-none focus:border-[#D4D4D4] shadow-sm md:py-3.5 md:rounded:lg"
            />
            {formState.errors.email && <p className="text-sm text-red-600">{formState.errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="phone" text="Numer telefonu"/>
             <input 
              id="phone"
              {...register("phone")}
              type="text"
              className="bg-[#F2F2F7] w-full px-2 py-2 text-base text-[#000] rounded-xl border-[0.5px] border-transparent outline-none focus:border-[#D4D4D4] shadow-sm md:py-3.5 md:rounded:lg"
            />
            {formState.errors.phone && <p className="text-sm text-red-600">{formState.errors.phone.message}</p>}
          </div>

          <button
            type="submit" 
            className="w-git text-center font-semibold text-sm px-16 py-3 rounded-xl bg-gradient-to-b from-[#313131] to-[#141414] shadow-md text-white hover:cursor-pointer hover:bg-[#333333]"
          >
            Zapisz
          </button> 
        </form>

        {/* BOX WITH BACKGROUND TO EXIT */}
        <div className="absolute left-0 top-0 w-full h-full bg-black/80 -z-10" onClick={onClose}/>
      </div>
    </div>
  , document.body)  
  )
}
'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Upload } from "lucide-react"
import { useState } from "react"

export default function SettingsGalleryUploadButton() {
  const queryClient = useQueryClient()
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"]
  const [error, setError] = useState("")

   const {mutate, isPending} = useMutation({
    mutationKey: ["uploadGalleryImage"],
    mutationFn: async (data:FormData) => {
      try {
        await fetch("/api/uploadGalleryImage", {
            method: "POST",
            body: data
        })

        return 
      } catch (err) {
          return { err }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["getUserImages"]})
  })

  const handleUpload = async (e) => {
    const file = e.target.files[0]

    if (!validFileTypes.includes(file.type)) {
      setError("Wymagany format pliku JPG/PNG!")
      return
    }

    const form = new FormData()
    form.append('image', file)

    mutate(form)
  }

  return ( 
    <div className='w-full flex flex-row gap-4 items-center'>
      <label 
        className="w-full flex flex-row gap-2 justify-center items-center py-3 bg-[#F2F4F8] font-normal text-[#111] text-sm border border-[#D1D5D4] rounded-md hover:cursor-pointer hover:bg-[#F0F2F6] md:w-1/3 md:py-2 lg:w-1/4" 
        htmlFor='imageInput'
      > <Upload size={18} color="#111" strokeWidth={1}/> Dodaj zdjęcie</label>
      <input 
        id="imageInput" 
        type="file" 
        name="imageInput" 
        hidden 
        disabled={isPending}  
        onChange={handleUpload}
      />  
      <p className="text-xs text-[#FF453A] font-normal ">{error}</p>
    </div>
  )
}
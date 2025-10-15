'use client'
import { useSettingsUploadImage } from "@/lib/hooks/dashboard/useSettingsUploadImage"
import { useToastStore } from "@/lib/store"
import { Upload } from "lucide-react"

export const DashboardSettingsGalleryUploadButton = () => {
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"]
  const showToast = useToastStore(store => store.showToast)
  const { mutate, isPending } = useSettingsUploadImage()

  const handleUpload = async (e) => {
    const file = e.target.files[0]

    if (!validFileTypes.includes(file.type)) {
      showToast("Wymagany format pliku JPG/PNG!", "error")
      return
    }

    const form = new FormData()
    form.append('image', file)
    mutate(form)
  }

  return ( 
    <div className='h-fit w-full flex flex-row justify-end '>
      <label 
        className="flex w-fit text-center text-sm px-3 py-2 rounded-2xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333] gap-2"
        htmlFor='imageInput'
      > 
        <Upload size={18} color="#FFF" strokeWidth={1.5}/> Dodaj zdjęcie
      </label>
      <input 
        id="imageInput" 
        type="file" 
        name="imageInput" 
        hidden 
        disabled={isPending}  
        onChange={handleUpload}
      />  
    </div>
  )
}
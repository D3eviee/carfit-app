'use client'
import { DeleteGalleryImage } from "@/app/dashboard/settings/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";

type SettingDeleteImageModalProps = {
  isOpen: boolean
  close: () => void
  imageId: string
}

export default function SettingDeleteImageModal({isOpen, close, imageId}:SettingDeleteImageModalProps){
  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationKey: ["deleteGalleryImage"],
    mutationFn: async () => {
      try {
        return await DeleteGalleryImage(imageId)
      } catch (err) {
          return { err }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["getUserImages"]})
  })

  const handleImageDelete = async () => {
    mutate()
    close()
  }

  return (
    <>
      {isOpen && createPortal(
        <div className="realative fixed top-0 left-0 w-full h-dvh mx-auto my-auto">
          {/* BOX WITH BG FOR CONTENT */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] p-5 z-10 bg-white rounded-md sm:w-[320px]">
            <div className="flex flex-col gap-5">
              <h1 className="text-sm font-light text-[#111]">Czy napewno chcesz usunąć zdjęcie? Działanie to jest nieodwracalne.</h1>
              <div className="flex flex-row w-full  gap-2">
                <button
                  className="flex justify-center items-center w-full bg-[#EFEFF1] border border-[#DEDEE0] py-1.5 rounded hover:cursor-pointer hover:bg-[#DEDEE0] text-[#222] text-xs font-medium"
                  onClick={close}
                >
                  Anuluj
                </button>
              
                <button
                  className="flex justify-center items-center w-full bg-[#FF453A] border border-[#EE3420] py-1.5 rounded hover:cursor-pointer hover:bg-[#BE031A] text-white text-xs font-medium"
                  onClick={handleImageDelete}
                  disabled={isPending}
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        
        {/* BOX WITH BACKGROUND TO EXIT */}
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-70 -z-10"/>
        </div>
        , document.body)
      }
    </>
  )
}

'use client'
import Image from "next/image";
import default_user_image from '@/../public/default_user_image.png'
import { Spinner } from "@/components/spinner";
import { useToastStore } from "@/lib/store";
import { Trash } from "lucide-react";
import { checkImageType } from "@/utils";
import { useDashboardProfilePhoto } from "@/lib/hooks/dashboard/useDashboardProfilePhoto";
import { useUploadDashboardProfilePhoto } from "@/lib/hooks/dashboard/useUploadDashboardProfilePhoto";
import { useRemoveDashboardProfilePhoto } from "@/lib/hooks/dashboard/useRemoveDashboardProfilePhoto";

export const DashboardProfileDataEditImage = () => {
  const showToast = useToastStore(store => store.showToast)

  const {data: dashboardProfileImage, isPending: dashboardProfileImageIsPending} = useDashboardProfilePhoto()
  const {mutate: uploadImageMutation, isPending: uploadImageIsPending} = useUploadDashboardProfilePhoto()
  const {mutate: deleteImageMutation, isPending: deleteImageIsPending} = useRemoveDashboardProfilePhoto()

  const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files[0]
    const imageTypeCheck = checkImageType(uploadedImage)

    if(imageTypeCheck == null){
      showToast("Nieprawidłowy format pliku", "error")
      return null
    }
    uploadImageMutation(imageTypeCheck)
  }
  
  return(
    <div className="w-full flex flex-row gap-8 items-center p-1">
      {/* IMAGE */}
      <div className="w-fit relative min-w-20 min-h-20 max-w-24 max-h-24 rounded-full overflow-hidden">
        { (uploadImageIsPending || deleteImageIsPending ||  dashboardProfileImageIsPending)
          ? <Spinner/> 
          : <Image
              sizes="full"
              src={dashboardProfileImage || default_user_image}
              fill
              className="object-cover rounded-full"
              alt="Profile photo"
            />
          } 
      </div>
      
      {/* BUTTONS FOR MANAGING ACTION FOR IMAGE UPLOAD */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-row gap-4">
           {/* UPLOAD IMAGE BUTTON */}
          <label className="w-full flex items-cente
          r justify-center bg-[#F2F2F7] rounded-2xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105  py-2.5">
            <p className="text-[#0C0C0C] text-sm">Dodaj zdjęcie</p>
            <input type="file"  hidden onChange={handleImageUpload} disabled={uploadImageIsPending}/>
          </label>

          {/* DELETE IMAGE BUTTON */}
          {dashboardProfileImage &&
            <div 
              onClick={() => deleteImageMutation(dashboardProfileImage)}
              className="h-fit bg-red-400 px-2.5 py-2.5 text-center rounded-2xl hover:cursor-pointer shadow-bnw-y-small shadow-inner-glass  active:scale-105"
            >
              <Trash size={20} color="white" strokeWidth={2} />
            </div>
          }
        </div>
        <p className="w-full pl-0.5 text-xs text-[#363638] text-pretty font-light leading-3.5">Dozwolony format 
          <span className="font-semibold"> .jpg .jpge .png</span>
        </p>
      </div>
    </div>
  )
}
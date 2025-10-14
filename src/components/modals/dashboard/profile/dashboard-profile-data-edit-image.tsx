'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import default_user_image from '@/../public/default_user_image.png'
import { Spinner } from "@/components/spinner";
import { useToastStore } from "@/lib/store";
import { Trash } from "lucide-react";
import { checkImageType } from "@/utils";
import { deleteDashboardProfileImage, getDashboardProfilePhotoEditModal, uploadNewDashboardProfileImage } from "@/app/dashboard/profile/actions";

export const DashboardProfileDataEditImage = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast)

  const {data: dashboardProfileImage, isPending: dashboardProfileImageIsPending} = useQuery({
    queryKey: ["getUserPhotoEditModal"],
    queryFn: async () => {
      const userImage = await getDashboardProfilePhotoEditModal()
      if(!userImage.success) return showToast(userImage.message, "error")
      return userImage.data
    }
  })

  const {mutate: uploadImageMutation, isPending: uploadImageIsPending} = useMutation({
    mutationKey: ["uploadNewProfileImage"],
    mutationFn: async (data:FormData) => {
      const result = await uploadNewDashboardProfileImage(data)
      if(!result.success){
        showToast(result.message, "error")
        return result.message
      }
      return result.data
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["getUserPhotoEditModal"] })
      queryClient.invalidateQueries({ queryKey: ["getBusinessProfile"] })
    }
  })

  const {mutate: deleteImageMutation, isPending: deleteImageIsPending} = useMutation({
    mutationKey: ["deleteImageMutation"],
    mutationFn: async (imageLink:string) => {
      try {
        const result =  await deleteDashboardProfileImage(imageLink)
        if(!result.success) {
          showToast(result.message, "error")
          return result.data
        }
        return 
      }catch (error) {
        showToast(error, "error")
      }
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["getUserPhotoEditModal"] })
      queryClient.invalidateQueries({ queryKey: ["getBusinessProfile"] })
    } 
  })  

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
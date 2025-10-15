'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadNewClientProfileImage } from "@/app/user/profile/actions";
import { useToastStore } from "@/lib/store";

export const useUploadClientProfilePhoto = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast)
  return useMutation({
    mutationKey: ["uploadClientProfileImage"],
    mutationFn: async (data:FormData) => {
      const response = await uploadNewClientProfileImage(data)
      if (!response.success){
        showToast(response.message, "error")
        return
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserPhoto"] })
      queryClient.invalidateQueries({ queryKey: ["userProfileData"] })
    } 
  })
}
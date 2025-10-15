'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClientProfileImage } from "@/app/user/profile/actions";
import { useToastStore } from "@/lib/store";

export const useRemoveClientProfilePhoto = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast)
  return useMutation({
    mutationKey: ["deleteClientProfileImage"],
    mutationFn: async (imageUrl:string) => {
      const response = await deleteClientProfileImage(imageUrl)
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
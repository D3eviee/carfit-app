'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/lib/store";
import { deleteDashboardProfileImage } from "@/app/dashboard/profile/actions";

export const useRemoveDashboardProfilePhoto = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast)
  return useMutation({
    mutationKey: ["removeDashboardProfilePhoto"],
    mutationFn: async (imageUrl:string) => {
      const response = await deleteDashboardProfileImage(imageUrl)
      if (!response.success){
        showToast(response.message, "error")
        return
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDashboardProfilePhoto"] })
      queryClient.invalidateQueries({ queryKey: ["getBusinessProfile"] })
    } 
  })
}
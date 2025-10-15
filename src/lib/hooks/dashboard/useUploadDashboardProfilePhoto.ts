'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/lib/store";
import { uploadNewDashboardProfileImage } from "@/app/dashboard/profile/actions";

export const useUploadDashboardProfilePhoto = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast)
  return useMutation({
    mutationKey: ["uploadDashboardProfilePhoto"],
    mutationFn: async (data:FormData) => {
      const response = await uploadNewDashboardProfileImage(data)
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
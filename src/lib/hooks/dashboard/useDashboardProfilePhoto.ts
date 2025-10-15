'use client'
import { useQuery } from "@tanstack/react-query";
import { useToastStore } from "@/lib/store";
import { getDashboardProfilePhotoEditModal } from "@/app/dashboard/profile/actions";

export const useDashboardProfilePhoto = () => {
  const showToast = useToastStore(store => store.showToast)
  return useQuery({
    queryKey: ["getDashboardProfilePhoto"],
    queryFn: async () => {
      const response = await getDashboardProfilePhotoEditModal();
      if (!response.success){
        showToast(response.message, "error")
        return
      }
      return response.data;
    }
  })
}
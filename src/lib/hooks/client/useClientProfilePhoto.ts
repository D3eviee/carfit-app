'use client'
import { useQuery } from "@tanstack/react-query";
import { getClientPhoto } from "@/app/user/profile/actions";
import { useToastStore } from "@/lib/store";

export const useClientProfilePhoto = () => {
  const showToast = useToastStore(store => store.showToast)
  return useQuery({
    queryKey: ["getUserPhoto"],
    queryFn: async () => {
      const response = await getClientPhoto();
      if (!response.success){
        showToast(response.message, "error")
        return
      }
      return response.data;
    }
  })
}
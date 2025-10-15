import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBusinessGalleryImages } from "@/app/dashboard/settings/actions";

export const useSettingsUploadImage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["uploadGalleryImage"],
    mutationFn: async (data:FormData) => {
      await fetch("/api/uploadGalleryImage", {
            method: "POST",
            body: data
        })
      const response = await getBusinessGalleryImages();
      if (!response) return
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["getBusinessGalleryImages"]})
  });
}

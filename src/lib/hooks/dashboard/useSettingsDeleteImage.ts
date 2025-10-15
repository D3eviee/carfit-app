import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBusinessGalleryImage } from "@/app/dashboard/settings/actions";
import { useModalStore, useToastStore } from "@/lib/store";

export const useSettingsDeleteImage = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast)
  const closeModal = useModalStore(store => store.closeModal)
  return useMutation({
    mutationKey: ["deleteGalleryImage"],
    mutationFn: async (imageId:string) => {
      const response = await deleteBusinessGalleryImage(imageId);
      if(!response.success){
        showToast(response.message, "error")
      }
      return response.data;
    },
    onSuccess: () => {
      showToast("Zapisano zmiany", "success")
      closeModal()
      queryClient.invalidateQueries({queryKey: ["getBusinessGalleryImages"]})
    }
  });
}

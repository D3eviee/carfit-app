import { updateBusinessSocialMediaLinks } from "@/app/dashboard/settings/actions"
import { BusinessSocialLinks } from "@/lib/schema"
import { useModalStore, useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSettingUpdateSocialLinks = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast) 
  const closeModal = useModalStore(store => store.closeModal) 
  
  return useMutation({
      mutationKey: ["updateSocialLinks"],
      mutationFn:  async (data:BusinessSocialLinks) => {
        const response = await updateBusinessSocialMediaLinks(data)
        if(!response.success){
          showToast("Zapisano zmiany", "success")
          return 
        }
        return response.data
    },
    onSuccess() {
      showToast("Zapisano zmiany", "success")
      closeModal()
      queryClient.invalidateQueries({ queryKey: ["getBusinessInformationForSettings"] })
    },
  }) 
}
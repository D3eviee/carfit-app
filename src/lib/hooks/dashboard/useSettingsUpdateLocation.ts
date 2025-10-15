import { updateBusinessLocation } from "@/app/dashboard/settings/actions"
import { LocationSettings } from "@/lib/schema"
import { useModalStore, useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSettingUpdateLocation = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast) 
  const closeModal = useModalStore(store => store.closeModal) 
  
  return useMutation({
      mutationKey: ["updateBusinessLocation"],
      mutationFn:  async (data:LocationSettings) => {
        const response = await updateBusinessLocation(data)
        if(!response.success){
          showToast("Wystąpił problem podczas zapisywania danych", "success")
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
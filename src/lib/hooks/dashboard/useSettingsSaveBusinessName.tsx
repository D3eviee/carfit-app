import { editBusinessName } from "@/app/dashboard/settings/actions"
import { useModalStore, useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSettingsSaveBusinessName = () => {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal) 
  const showToast = useToastStore(store => store.showToast) 
  
  return useMutation({
      mutationKey: ["settingsSaveBusinessName"],
      mutationFn:  async (businessName: string) => {
        const response = await editBusinessName(businessName.trim())
        if(!response.success){
            showToast(response.message, "error")
            return 
        }
        return response.data
    },
    onSuccess() {
        closeModal()
        showToast("Zapisano zmiany", "success")
        queryClient.invalidateQueries({ queryKey: ["getSettingsBusinessData"] })
        queryClient.invalidateQueries({ queryKey: ["getBusinessProfile"] })
    },
  }) 
}
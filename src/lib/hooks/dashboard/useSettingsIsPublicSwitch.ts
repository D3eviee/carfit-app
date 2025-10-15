import { toggleIsBusinessPublic } from "@/app/dashboard/settings/actions"
import { useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSettingsIsPublicSwitch = () => {
  const queryClient = useQueryClient()
  const showToast = useToastStore(store => store.showToast) 
  
  return useMutation({
      mutationKey: ["toggleBusinessIsPublic"],
      mutationFn:  async (isPublic:boolean) => {
        const response = await toggleIsBusinessPublic(isPublic)
        if(!response.success){
          return 
        }
        return response.isPublic
    },
    onSuccess(data) {
      showToast(
        data ? "Serwis został upubliczniony" : "Serwis nie jest publicznie widoczny", 
        data ? "success" : "error")
      queryClient.invalidateQueries({ queryKey: ["settingsCheckIsVisible"] })
    },
  }) 
} 
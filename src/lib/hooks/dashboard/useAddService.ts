import { addNewService } from "@/app/dashboard/services/actions"
import { useModalStore, useToastStore } from "@/lib/store"
import { Service } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditService = () => {
    const queryClient = useQueryClient()
    const closeModal = useModalStore(store => store.closeModal)
    const showToast = useToastStore(store => store.showToast)

    return useMutation({
        mutationKey: ["useAddService"],
        mutationFn: async (data:Service) => {
          const response = await addNewService(data)
          if(!response.success) {
            showToast(response.message, "error")
            return 
          }
        closeModal()
        showToast(response.message, "success")
        return response.data
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] })
      closeModal()
    }
  })
}
import { editService } from "@/app/dashboard/services/actions"
import { useModalStore, useToastStore } from "@/lib/store"
import { Service } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditService = (serviceId:string) => {
    const queryClient = useQueryClient()
    const closeModal = useModalStore(store => store.closeModal)
    const showToast = useToastStore(store => store.showToast)

    return useMutation({
        mutationKey: ["useEditService"],
        mutationFn: async (data:Service) => {
          const editedData = { id: serviceId, ...data }
          const response = await editService(editedData)
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
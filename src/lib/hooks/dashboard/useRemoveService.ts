import { deleteService } from "@/app/dashboard/services/actions"
import { useModalStore, useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useRemoveService = () => {
    const queryClient = useQueryClient()
    const closeModal = useModalStore(store => store.closeModal)
    const showToast = useToastStore(store => store.showToast)

    return useMutation({
        mutationFn: async (categoryId: string) => {
        const response = await deleteService(categoryId)
        if(!response.success) {
            showToast(response.message, "error")
            return 
        }
        closeModal()
        showToast(response.message, "success")
        return response.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] })
  })
}
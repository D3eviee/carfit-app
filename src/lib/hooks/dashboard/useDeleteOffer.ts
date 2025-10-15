"use client"

import { deleteServiceOffer } from "@/app/dashboard/listings/actions"
import { useActiveListingStore, useModalStore, useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteOffer = () => {
    const queryClient = useQueryClient()
    const updateOffering = useActiveListingStore(store => store.updateOffering)
    const showToast = useToastStore(store => store.showToast)
    const closeModal = useModalStore(store => store.closeModal)

    return useMutation({
        mutationKey: ["deleteOffer"],
        mutationFn: async (offerId:string ) => {    
        const updateClientCarResult = await deleteServiceOffer(offerId)
        
        if(!updateClientCarResult.success){
            showToast(updateClientCarResult.message, "error")
            return 
        }

        showToast(updateClientCarResult.message, "success")
        closeModal()
        closeModal()
        },  
        onSuccess: () => {
        updateOffering("")
        queryClient.invalidateQueries({queryKey: ["userProfileData"]}) 
        }
    })
}



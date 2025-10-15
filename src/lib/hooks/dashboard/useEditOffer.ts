"use client"

import { updateServiceOffer } from "@/app/dashboard/listings/actions"
import { useActiveListingStore, useModalStore, useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Offer = { offer: string }

export const useEditOffer = (offerId:string) => {
    const queryClient = useQueryClient()
    const updateOffering = useActiveListingStore(store => store.updateOffering)
    const toggleIsEditing = useActiveListingStore(store => store.toggleIsEditing)
    const showToast = useToastStore(store => store.showToast)
    const closeModal = useModalStore(store => store.closeModal)

    return useMutation({
        mutationKey: ["editOffer", offerId],
        mutationFn: async (data: Offer) => {  
            console.log(data)  
            console.log(offerId)  
        const response = await updateServiceOffer(offerId, data.offer)
        
        if(!response.success){
            showToast("wystąpił problem podczas aktualizacji oferty", "error")
            return 
        }

        closeModal()
        closeModal()
        },  
        onSuccess: (response, variables) => {
            showToast("Zapisano", "success")
            queryClient.invalidateQueries({queryKey: ["getOfferings", offerId]})
            updateOffering(variables.offer)
            toggleIsEditing()
      }
    })
}

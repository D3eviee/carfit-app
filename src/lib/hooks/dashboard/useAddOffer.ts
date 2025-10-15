"use client"

import { addServiceOffer, updateServiceOffer } from "@/app/dashboard/listings/actions"
import { useActiveListingStore, useModalStore, useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Offer = { offer: string }

export const useAddOffer = (offerId: string) => {
    const queryClient = useQueryClient()
    const updateOffering = useActiveListingStore(store => store.updateOffering)
    const showToast = useToastStore(store => store.showToast)
    const closeModal = useModalStore(store => store.closeModal)
    
    return useMutation({
        mutationKey: ["addOffer", offerId],
        mutationFn: async (data: Offer) => {  
        const response = await addServiceOffer(offerId, data.offer)
        
        if(!response.success){
            showToast("wystąpił problem podczas dodawania oferty", "error")
            return 
        }

        closeModal()
        closeModal()
        },  
        onSuccess: (response, variables) => {
            showToast("Zapisano", "success")
            queryClient.invalidateQueries({queryKey: ["getOfferings", offerId]})
            updateOffering(variables.offer)
      }
    })
}
'use client'
import { useActiveListingStore, useModalStore, useToastStore } from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../spinner";
import { deleteServiceOffer } from "@/app/dashboard/listings/actions";

export default function DashboardListingsDeleteOfferModal({offerId}:{offerId:string}){
  const queryClient = useQueryClient()
  const updateOffering = useActiveListingStore(store => store.updateOffering)
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  console.log(offerId)
  const {mutate: deleteOfferMutation, isPending: deleteOfferMutationIsPending} = useMutation({
    mutationKey: ["deleteOffer"],
    mutationFn: async () => {    
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

  const handleDeletingOffer = () => deleteOfferMutation()

  return(
    <div className="flex flex-col px-6 pt-6 pb-3 bg-white backdrop-blur-[3px] ring-1 ring-white inset-shadow-white rounded-2xl max-w-[500px] text-black space-y-5">
      <p className="px-1 text-[#191919] text-middle text-pretty text-left font-normal tracking-tighter">Czy na pewno chcecsz usunąć ofertę?</p>
      
      {/* CONTENT */}
      <div className="w-full flex flex-row gap-2.5">
        <div 
          onClick={closeModal}
          className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
        >
          Anuluj
        </div>
        
        <div 
          onClick={handleDeletingOffer}
          className="w-full text-center justify-center py-2 bg-[#FF453A] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#333] active:scale-105"
        >
          {deleteOfferMutationIsPending ? <Spinner/> : "Usuń" }
        </div>
      </div>
    </div>
  )
}

    
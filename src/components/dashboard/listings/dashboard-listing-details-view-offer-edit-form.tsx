import { useActiveListingStore, useToastStore } from "@/lib/store"
import { FormError } from "@/components/forms/form-error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { updateServiceOffer } from "@/app/dashboard/listings/actions"

type Offer = { offer: string }

export default function DashboardListingsDetailsViewOfferEditForm({offerDescription}:{offerDescription:string}){
   const queryClient = useQueryClient()
   const activeOffering = useActiveListingStore(store => store.activeOffering)
   const updateOffering = useActiveListingStore(store => store.updateOffering)
   const toggleIsEditing = useActiveListingStore(store => store.toggleIsEditing)
   const showToast = useToastStore(store => store.showToast)
   
   const {register, formState, handleSubmit, reset} = useForm<Offer>({
    defaultValues: { offer: offerDescription }
  })

  const {mutate: editOfferMutation} = useMutation({
      mutationKey: ["saveOffer", activeOffering.id],
      mutationFn: async (data: Offer) => {
        try{
          const response = await updateServiceOffer(activeOffering.offerId, data.offer)
          return response
        }catch(error){
          console.error("Problem podczas dodawania rezerwacji" +  error)
        }
      },
      onSuccess: (response, variables) => {
        showToast("Zapisano", "success")
        queryClient.invalidateQueries({queryKey: ["getOfferings", activeOffering.id]})
        updateOffering(variables.offer)
        toggleIsEditing()
        reset()
      }
    })
  
    const handleSavingOffer = (data) => editOfferMutation(data)

    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSavingOffer)}>
        <div className="flex flex-col gap-1">
          <textarea
            placeholder="Opisz swoją ofertę – np. cena, dostępny termin, dodatkowe informacje"
            id="offer"
            rows={8}
            className="text-sm w-full bg-[#F6F7FB] px-3 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            {...register("offer")}
          ></textarea>
          <FormError error={formState.errors.offer?.message}/>
        </div>
        <button className="w-full bg-[#111] py-3 text-center rounded-xl text-white border text-sm hover:cursor-pointer active:scale-[0.98]">Zapisz</button>
      </form>
    )
} 
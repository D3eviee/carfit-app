import { useActiveListingStore, useToastStore } from "@/lib/store"
import { FormError } from "@/components/forms/form-error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { addServiceOffer } from "@/app/dashboard/listings/actions"

type Offer = { offer: string }

export default function DashboardListingsDetailsViewOfferForm(){
   const queryClient = useQueryClient()
   const activeOffering = useActiveListingStore(store => store.activeOffering)
   const updateOffering = useActiveListingStore(store => store.updateOffering)
   const showToast = useToastStore(store => store.showToast)

   const {register, formState, handleSubmit, reset} = useForm<Offer>({
    defaultValues: { offer: "" }
  })

    const {mutate: addOfferMutation} = useMutation({
      mutationKey: ["addOffer"],
      mutationFn: async (data: Offer) => {
        try{
          const response = await addServiceOffer(activeOffering.id, data.offer)
          return response
        }catch(error){
          console.error("Problem podczas dodawania rezerwacji" +  error)
        }
      },
      onSuccess: (response, variables) => {
        showToast("Dodano ofertę", "success") 
        queryClient.invalidateQueries({queryKey: ["getOfferings"]})
        updateOffering(variables.offer)
        reset()
      }
    })
  
      const handleSendingOffer = (data) => addOfferMutation(data)
    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSendingOffer)}>
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
        <button className="w-full bg-[#111] py-3 text-center rounded-xl text-white border text-sm hover:cursor-pointer active:scale-[0.98]">Wyślij</button>
      </form>
    )
} 
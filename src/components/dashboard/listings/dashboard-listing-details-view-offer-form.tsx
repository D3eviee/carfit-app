import { useActiveListingStore } from "@/lib/store"
import { FormError } from "@/components/forms/form-error"
import { useForm } from "react-hook-form"
import { useAddOffer } from "@/lib/hooks/dashboard/useAddOffer"

type Offer = { offer: string }

export default function DashboardListingsDetailsViewOfferForm(){
  const activeOfferingId = useActiveListingStore(store => store.activeOffering.id)
  const {register, formState, handleSubmit} = useForm<Offer>({
    defaultValues: { offer: "" }
  })

  const {mutate: addOfferMutation} = useAddOffer(activeOfferingId)
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
'use client'
import { Spinner } from "../spinner";
import { useDeleteOffer } from "@/lib/hooks/dashboard/useDeleteOffer";
import { ExitModalButton } from "./exit-modal-button";

export default function DashboardListingsDeleteOfferModal({offerId}:{offerId:string}){
  const {mutate, isPending} = useDeleteOffer()
  const handleDeletingOffer = () => mutate(offerId)

  return(
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <p className="text-main-black text-middle leading-none font-semibold">Czy na pewno chcecsz usunąć ofertę?</p>
      {/* CONTENT */}
      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton/>
        
        <div 
          onClick={handleDeletingOffer}
          className="w-full text-center justify-center py-2.5 bg-[#F95A59] text-white rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#E84948] active:scale-xs"
        >
          {isPending ? <Spinner color="#FFF"/> : "Usuń" }
        </div>
      </div>
    </div>
  )
}

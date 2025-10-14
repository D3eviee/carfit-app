'use client'
import { useModalStore } from "@/lib/store";
import { Spinner } from "../../../spinner";
import { ExitModalButton } from "../../exit-modal-button";
import { useCancelAnnouncement } from "@/lib/hooks/client/useCancelAnnouncement";

export const UserAnnouncmentPageCancelAnnouncementModal = ({announcementId}:{announcementId:string}) => {
  const closeModal = useModalStore(store => store.closeModal)
  const {mutate:cancelAnnouncement, isPending} = useCancelAnnouncement()

  return(
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <div className="flex flex-col gap-2.5 px-2">
        <p className="text-main-black text-middle leading-none font-semibold">Czy na pewno chcesz usunąć ogłoszenie?</p>
        <p className=" text-main-black text-sm leading-none">Czynność ta jest nieodwracalna.</p>
      </div>

      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton exitFn={closeModal}/>
      
        <div 
          onClick={() => cancelAnnouncement(announcementId)}
          className="w-full text-center justify-center py-2.5 bg-[#F95A59] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#E84948] active:scale-105"
        >
          {isPending ? <Spinner color="#FFF"/> : <p className="text-[#FFF]">Usuń</p>}
        </div>
      </div>
    </div>
  )
}
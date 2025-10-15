'use client'
import { Spinner } from "../../../spinner";
import { ExitModalButton } from "../../exit-modal-button";
import { useCloseAnnouncement } from "@/lib/hooks/client/useCloseAnnouncement";

export const UserAnnouncmentPageCloseAnnouncementModal = ({announcementId}:{announcementId:string}) => {
  const {mutate:closeAnnouncement, isPending} = useCloseAnnouncement()

  return(
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <div className="flex flex-col gap-2.5 px-2">
        <p className="text-main-black text-middle leading-5.5 font-semibold">Czy na pewno chcesz zamknąć ogłoszenie?</p>
        <p className=" text-main-black text-sm leading-none">Czynność ta jest nieodwracalna.</p>
      </div>

      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton/>
      
        <div 
          onClick={() => closeAnnouncement(announcementId)}
          className="w-full text-center justify-center py-2.5 bg-[#1E6EF3] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#2F5FF4] active:scale-105"
        >
          {isPending ? <Spinner color="#FFF"/> : <p className="text-[#FFF]">Zamknij</p>}
        </div>
      </div>
    </div>
  )
}

    
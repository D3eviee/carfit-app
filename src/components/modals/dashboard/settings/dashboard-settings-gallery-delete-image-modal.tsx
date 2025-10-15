'use client'
import { Spinner } from "@/components/spinner";
import { ExitModalButton } from "../../exit-modal-button";
import { useSettingsDeleteImage } from "@/lib/hooks/dashboard/useSettingsDeleteImage";

export const DashboardSettingsGalleryDeleteImageModal = ({ imageId}:{imageId:string}) => {
  const {mutate, isPending} = useSettingsDeleteImage()
  const handleImageDeletion = async () => mutate(imageId)

  return (
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <p className="text-main-black text-middle leading-none font-semibold">Czy napewno chcesz usunąć zdjęcie?</p>
      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton/>
        <div 
          onClick={handleImageDeletion}
          className="w-full text-center justify-center py-2.5 bg-[#F95A59] text-white rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#E84948] active:scale-xs"
        >
          {isPending ? <Spinner color="#FFF"/> : "Usuń"}
        </div>
      </div>
    </div>
  )
}
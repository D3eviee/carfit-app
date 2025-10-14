'use client'
import { Spinner } from "../../../spinner";
import { ExitModalButton } from "../../exit-modal-button";
import { useDeleteServiceCategory } from "@/lib/hooks/dashboard/useDeleteServiceCategory";

export const DashboardServicesDeleteCategoryModal = ({categoryId}: {categoryId:string}) => {
  const {mutate, isPending }= useDeleteServiceCategory()
  const handleDeletingCategory = () => mutate(categoryId)

  return(
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <div className="flex flex-col gap-2.5 px-2">
        <p className="text-main-black text-middle leading-none font-semibold">Czy na pewno usunąć kategorię?</p>
        <p className=" text-main-black text-sm leading-none">Czynność ta jest nieodwracalna.</p>
      </div>
      
      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton/>
        
        <div 
          onClick={handleDeletingCategory}
          className="w-full text-center justify-center py-2.5 bg-[#F95A59] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#E84948] active:scale-105"
        >
         {isPending ? <Spinner color="#FFF"/>  : <p className="text-[#FFF]">Usuń</p>} 
        </div>
      </div>
    </div>
  )
}    
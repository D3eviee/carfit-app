'use client'
import { useModalStore, useToastStore } from "@/lib/store";
import { deleteService } from "@/app/dashboard/services/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner";
import { ExitModalButton } from "../../exit-modal-button";

export const DashboardServicesDeleteServiceModal = ({serviceId}: {serviceId:string}) => {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const { mutate: deleteServiceMutation, isPending:deleteCategoryMutationIsPending } = useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await deleteService(categoryId)
      if(!response.success) {
        showToast(response.message, "error")
        return 
      }
      closeModal()
      showToast(response.message, "success")
      return response.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] })
  })

  const handleDeletingService = () => {
    deleteServiceMutation(serviceId)
  }

  return(
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <div className="flex flex-col gap-2.5 px-2">
        <p className="text-main-black text-middle leading-none font-semibold">Czy na pewno usunąć usługę?</p>
        <p className=" text-main-black text-sm leading-none">Czynność ta jest nieodwracalna.</p>
      </div>
      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton/>
        
        <div 
          onClick={handleDeletingService}
          className="w-full text-center justify-center py-2.5 bg-[#F95A59] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#E84948] active:scale-105"
        >
         {deleteCategoryMutationIsPending ? <Spinner color="#FFF"/>  : <p className="text-[#FFF]">Usuń</p>} 
        </div>
      </div>
    </div>
  )
}    
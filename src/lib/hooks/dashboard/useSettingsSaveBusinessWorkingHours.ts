import { updateBusinessWorkingHours } from "@/app/dashboard/settings/actions";
import { useModalStore, useToastStore } from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SetWorkingTimeDataDaysDataProps =  {
  isOpen: boolean
  open: string
  close: string
  dayOfWeek: string
}[]

export const useSettingsSaveBusinessWorkingHours = () => {
    const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  return useMutation({
      mutationKey: ["settingSaveBusinessWorkingHours"],
      mutationFn: async (days:SetWorkingTimeDataDaysDataProps) => {
        const workingDataResponse = await updateBusinessWorkingHours(days)
        if(!workingDataResponse.success){
          showToast(workingDataResponse.message, "error")
          return
        }
         showToast("Zapisano zmiany", "success")
         closeModal()
         return workingDataResponse.data
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getSettingsBusinessWorkingHours'] })
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore, useToastStore } from "@/lib/store";
import { DashboardProfileEditPersonalData } from "@/lib/schema";
import { updateDashboardProfileData } from "@/app/dashboard/profile/actions";

export const useEditDashboardProfileData = (oldData: DashboardProfileEditPersonalData) => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);

  return useMutation({
    mutationKey: ["saveDashboardProfileData"],
    mutationFn: async (newData: DashboardProfileEditPersonalData) => {
      const response = await updateDashboardProfileData(oldData, newData)
      if (!response.success) return null
      return response.data;
    },
    onSuccess: () => {
      showToast("Zapisano zmiany", "success");
      closeModal();
      queryClient.invalidateQueries({queryKey: ["getBusinessProfile"]})
    },
    onError: (err) => showToast(err.message || "Wystąpił błąd podczas zapisywania", "error"),
  });
}
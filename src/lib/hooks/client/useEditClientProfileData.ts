import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore, useToastStore } from "@/lib/store";
import { updateClientProfileData } from "@/app/user/profile/actions";
import { ChangeClientProfileData } from "@/lib/schema";

export const useEditClientProfileData = (oldData: ChangeClientProfileData) => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);

  return useMutation({
    mutationKey: ["saveUserProfileData"],
    mutationFn: async (newData: ChangeClientProfileData) => {
      const response = await updateClientProfileData(oldData, newData)
      if (!response.success) return null
      return response.data;
    },
    onSuccess: () => {
      showToast("Zapisano zmiany", "success");
      closeModal();
      queryClient.invalidateQueries({queryKey: ["userProfileData"]})
    },
    onError: (err) => showToast(err.message || "Wystąpił błąd podczas zapisywania", "error"),
  });
}

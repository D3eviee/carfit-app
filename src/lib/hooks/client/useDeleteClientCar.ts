import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClientCar } from "@/app/user/profile/actions";
import { useModalStore, useToastStore } from "@/lib/store";

export const useDeleteClientCar = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);
  
  return useMutation({
    mutationKey: ["deleteClientCar"],
    mutationFn: async (carId: string) => {
        const response = await deleteClientCar(carId)
      if (!response.success) {
        showToast(response.message, "error")
        throw new Error(response.message);
      }
      return response.message
    },
    onSuccess: (res) => {
      showToast(res, "success");
      closeModal();
      closeModal()
      queryClient.invalidateQueries({queryKey: ["userProfileData"]}) 
    },
    onError: (err) => showToast(err.message || "Wystąpił błąd podczas dodawania kategorii", "error"),
  });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore, useToastStore } from "@/lib/store";
import { updateClientCar } from "@/app/user/profile/actions";
import { AddNewCar } from "@/lib/schema";

export const useEditClientCar = (carId:string) => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);

  return useMutation({
    mutationKey: ["updateClientCar"],
    mutationFn: async (data: AddNewCar) => {
      const carData = {
        carId : carId,
        brand: data.brand,
        model: data.model,
        year: Number(data.year),        
      }
      const response = await updateClientCar(carData)
      if (!response.success) return null
      return response.success;
    },
    onSuccess: () => {
      showToast("Zapisano zmiany", "success");
      closeModal();
      queryClient.invalidateQueries({queryKey: ["userProfileData"]})
    },
    onError: (err) => showToast(err.message || "Wystąpił błąd podczas zapisywania", "error"),
  });
}
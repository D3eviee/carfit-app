import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNewCar } from "@/lib/schema";
import { addClientCar } from "@/app/user/profile/actions";
import { useModalStore, useToastStore } from "@/lib/store";

export const useAddClientCar = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);
  
  return useMutation({
    mutationKey: ["addClientCar"],
    mutationFn: async (data: AddNewCar) => {
      const carData = {
        brand: data.brand,
        model: data.model,
        year: Number(data.year),        
      }
      const response = await addClientCar(carData)
      if (!response.success) {
        showToast(response.message, "error")
        throw new Error(response.message);
        
      }
      return response.car
    },
    onSuccess: () => {
      showToast("Dodano", "success");
      closeModal();
      queryClient.invalidateQueries({queryKey: ["userProfileData"]}) 
    },
    onError: (err: any) => showToast(err.message || "Wystąpił błąd podczas dodawania kategorii", "error"),
  });
}
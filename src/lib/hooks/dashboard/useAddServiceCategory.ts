import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCategory } from "@/app/dashboard/services/actions";
import { useModalStore, useToastStore } from "../../store";

export const useAddServiceCategory = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(s => s.showToast);
  const closeModal = useModalStore(s => s.closeModal);
  
  return useMutation({
    mutationFn: async (name: string) => {
      const response = await addNewCategory(name.trim())
      if (!response.success) return null
      return response.data;
    },
    onSuccess: () => {
      showToast("Dodano", "success");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] })
    },
    onError: (err) => showToast(err.message || "Wystąpił błąd podczas dodawania kategorii", "error"),
  });
}
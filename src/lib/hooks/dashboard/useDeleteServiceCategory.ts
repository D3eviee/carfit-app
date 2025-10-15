import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/app/dashboard/services/actions";
import { useModalStore, useToastStore } from "../../store";

export const useDeleteServiceCategory = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(s => s.showToast);
  const closeModal = useModalStore(s => s.closeModal);
  
  return useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await deleteCategory(categoryId)
      if (!response.success){
        showToast(response.message, "error")
        return null
      }
      return response.data;
    },
    onSuccess: () => {
      showToast("Usunięto", "success");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] })
    },
    onError: (err) => showToast(err.message || "Wystąpił błąd podczas dodawania kategorii", "error"),
  });
}
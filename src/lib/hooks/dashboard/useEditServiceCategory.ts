import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategoryName } from "@/app/dashboard/services/actions";
import { useModalStore, useToastStore } from "../../store";

export const useEditServiceCategory = (categoryId: string) => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(s => s.showToast);
  const closeModal = useModalStore(s => s.closeModal);

  return useMutation({
    mutationFn: async (categoryName: string) => {
      const response = await editCategoryName(categoryId, categoryName.trim())
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      showToast("Zapisano zmiany", "success");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] })
    },
    onError: (err: any) => showToast(err.message || "Wystąpił błąd podczas edycji kategorii", "error"),
  });
}
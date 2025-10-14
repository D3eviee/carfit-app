import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore, useToastStore } from "@/lib/store";
import { addClientReview } from "@/app/user/actions";

type Review = {
  title: string
  comment: string
  rate: number
  businessId: string
  appointmentId: string
}

export const useAddClientReview = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);
  
  return useMutation({
    mutationKey: ["addClientReview"],
    mutationFn: async (data: Review) => {
      const response = await addClientReview(data)
      if (!response.success) {
        showToast(response.message, "error")
        throw new Error(response.message);
      }
      return response.review
    },
    onSuccess: () => {
      showToast("Dodano opinię", "success");
      closeModal();
      queryClient.invalidateQueries({queryKey: ["getClientAppointments"]}) 
    },
    onError: (err: any) => showToast(err.message || "Wystąpił błąd podczas dodawania opinii", "error"),
  });
}
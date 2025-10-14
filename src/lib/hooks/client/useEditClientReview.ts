import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditReviewStore, useToastStore } from "@/lib/store";
import { editClientReview } from "@/app/user/actions";

type Review = {
  title: string
  comment: string
  rate: number
  businessId: string
  appointmentId: string
}

export const useEditClientReview = () => {
  const toggleIsEditing = useEditReviewStore(store => store.toggleIsEditing)
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  
  return useMutation({
    mutationKey: ["editClientReview"],
    mutationFn: async (data: Review) => {
      const response = await editClientReview(data)
      if (!response.success) {
        showToast(response.message, "error")
        throw new Error(response.message);
      }
      return response.review
    },
    onSuccess: (updatedReview, variables) => {
      showToast("Zapisano zmiany", "success");

      // update cache without refetching
      queryClient.setQueryData(["getClientAppointments"], (old: any) => {
        if (!old) return old;

        // return data with new Review values
        return old.map((appointment: any) =>
          appointment.id === variables.appointmentId
            ? { ...appointment, Review: { ...appointment.Review, ...updatedReview }}
            : appointment
        )
      })
      toggleIsEditing();
    },
    onError: (err: any) => showToast(err.message || "Wystąpił błąd podczas dodawania opinii", "error"),
  });
}
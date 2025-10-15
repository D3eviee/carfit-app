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


type OldData = {
  id: string;
  reservationStart: Date;
  duration: number;
  status: string;
  clientMessage: string;
  Review: {
    id: string;
    title: string;
    content: string;
    rate: number;
    reservationId: string;
  };
  business: {
    name: string;
    id: string;
    image: string;
    town: string;
    district: string;
    street: string;
  };
  services: {
    service: {
      name: string;
      price: string;
    };
  }[];
}[];


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
      queryClient.setQueryData(["getClientAppointments"], (old: OldData) => {
        if (!old) return old;

        // return data with new Review values
        return old.map((appointment) =>
          appointment.id === variables.appointmentId
            ? { ...appointment, Review: { ...appointment.Review, ...updatedReview }}
            : appointment
        )
      })
      toggleIsEditing();
    },
    onError: (err) => showToast(err.message || "Wystąpił błąd podczas dodawania opinii", "error"),
  });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "@/app/dashboard/actions";
import { useModalStore, useToastStore } from "@/lib/store";

export const useCancelAppointment = (appointmentId:string) => {
  const queryClient = useQueryClient();
  const closeModal = useModalStore((state) => state.closeModal);
  const showToast = useToastStore((state) => state.showToast);

  const { mutate, isPending } = useMutation({
    mutationKey: ["cancelAppointment", appointmentId],
    mutationFn: async () => {
      const response = await cancelAppointment(appointmentId);

      if (!response.success) {
        showToast(response.message, "error");
        throw new Error(response.message);
      }

      showToast(response.message, "warning");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAppointmentsForWeekInterval"] });
      closeModal();
      closeModal();
    },
  });

  return {
    cancelAppointment: mutate,
    isPending,
  };
}
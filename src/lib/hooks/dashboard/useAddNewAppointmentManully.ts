import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore, useToastStore } from "@/lib/store";
import { addNewAppointmentManual } from "@/app/dashboard/calendar/actions";

type AppointmentData = {
    servicesIds: string[]
    reservationStart: Date
    clientName: string
    clientPhone: string
    clientCar: string
    description: string
    charge: number
    duration: number
}

export const useAddNewAppointmentManually = () => {
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["addAppointmentManually"],
    mutationFn: async (data: AppointmentData) => {  
      const response = await addNewAppointmentManual(data)
      if (!response.success) {
        showToast(response.message, "error")
        throw new Error(response.message);
      }
      return response.success
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["getAppointmentsForWeekInterval"]}) 
        showToast("Ogłoszenie zostało dodane", "success");
        closeModal();
    },
    onError: (error) => {
      console.error(error)
      showToast(error.message || "Wystąpił błąd podczas dodawania wizyty")
    },
  });
}
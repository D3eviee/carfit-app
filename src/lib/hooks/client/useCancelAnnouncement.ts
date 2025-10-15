import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore, useToastStore } from "@/lib/store";
import { cancelAnnouncement } from "@/app/user/announcements/actions";


export const useCancelAnnouncement = () => {
  const closeModal = useModalStore(store => store.closeModal)
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  
  return useMutation({
    mutationKey: ["cancelAnnouncement"],
    mutationFn: async (announcementId: string) => {
      const response = await cancelAnnouncement(announcementId)
      if (!response.success) {
        showToast(response.message, "error")
        throw new Error(response.message);
      }
      return response.success
    },
    onSuccess: () => {
      showToast("Ogłoszenie zostało usunięte", "success");
      queryClient.invalidateQueries({queryKey: ["getUserAnnouncement"]}) 
      closeModal()
      closeModal()
    },
    onError: (err) => showToast(err.message || "Wystąpił błąd podczas dodawania opinii", "error"),
  });
}


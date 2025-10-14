import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore, useToastStore } from "@/lib/store";
import { cancelAnnouncement, closeAnnouncement } from "@/app/user/announcements/actions";


export const useCloseAnnouncement = () => {
  const closeModal = useModalStore(store => store.closeModal)
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  
  return useMutation({
    mutationKey: ["closeAnnouncement"],
    mutationFn: async (announcementId: string) => {
      const response = await closeAnnouncement(announcementId)
      if (!response.success) {
        showToast(response.message, "error")
        throw new Error(response.message);
      }
      return response.success
    },
    onSuccess: () => {
      showToast("Ogłoszenie zostało zamknięte", "success");
      queryClient.invalidateQueries({queryKey: ["getUserAnnouncement"]}) 
      closeModal()
      closeModal()
    },
    onError: (err: any) => showToast(err.message || "Wystąpił błąd podczas zamykania ogłoszenia", "error"),
  });
}


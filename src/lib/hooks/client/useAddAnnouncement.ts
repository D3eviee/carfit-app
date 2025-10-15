import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore, useToastStore } from "@/lib/store";
import { Announcement } from "@/lib/types";
import { addNewAnnouncement } from "@/app/user/announcements/actions";

export const useAddAnnouncement = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);
  
  return useMutation({
    mutationKey: ["addAnnouncment"],
    mutationFn: async (data: Announcement) => {  
      const response = await addNewAnnouncement(data)
      if (!response.success) {
        showToast(response.message, "error")
        throw new Error(response.message);
      }
      return response.data
    },
    onSuccess: () => {
      showToast("Ogłoszenie zostało dodane", "success");
      closeModal();
      queryClient.invalidateQueries({queryKey: ["getClientAnnouncements"]}) 
    },
    onError: (error: any) => {
      console.error(error)
      showToast(error.message || "Wystąpił błąd podczas dodawania ogłoszenia")
    },
  });
}
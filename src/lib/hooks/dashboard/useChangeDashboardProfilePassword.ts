import { changeDashboardProfilePassword } from "@/app/dashboard/profile/actions";
import { ChangePasswordInput } from "@/lib/schema";
import { useModalStore, useToastStore } from "@/lib/store";
import { useState } from "react";

export const useChangeDashboardProfilePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);

  const changePassword = async (data: ChangePasswordInput) => {
    try {
      setIsLoading(true);
      const response = await changeDashboardProfilePassword(data);
      if (!response.success) throw new Error(response.message);
      showToast(response.message, "success");
      closeModal();
    } catch (err: any) {
      showToast(err.message || "Nie udało się zmienić hasła", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
};



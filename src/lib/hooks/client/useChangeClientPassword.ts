import { changeClientPassword } from "@/app/user/profile/actions";
import { ChangePasswordInput } from "@/lib/schema";
import { useModalStore, useToastStore } from "@/lib/store";
import { useState } from "react";

export const useChangeClientPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal);

  const changePassword = async (data: ChangePasswordInput) => {
    try {
      setIsLoading(true);
      const response = await changeClientPassword(data);
      if (!response.success) throw new Error(response.message);
      showToast(response.message, "success");
      closeModal();
    } catch (err) {
      showToast(err.message || "Nie udało się zmienić hasła", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
};

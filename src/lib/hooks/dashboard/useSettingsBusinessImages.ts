import { useQuery } from "@tanstack/react-query";
import { getBusinessGalleryImages } from "@/app/dashboard/settings/actions";

export const useSettingsBusinessGallery = () => {
  return useQuery({
    queryKey: ["getBusinessGalleryImages"],
    queryFn: async () => {
      const response = await getBusinessGalleryImages();
      if (!response) return
      return response.data;
    },
  });
}
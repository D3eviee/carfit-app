'use client'
import { useQuery } from "@tanstack/react-query";
import { getClientAnnouncement } from "@/app/user/announcements/actions";

export const useClientAnnouncement = (announcementId:string) => {
  return useQuery({
    queryKey: ["getUserAnnouncement", announcementId],
    queryFn: async () => {
      const response = await getClientAnnouncement(announcementId);
      if (!response.success) return
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 10, 
  })
}
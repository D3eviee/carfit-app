'use client'
import { useQuery } from "@tanstack/react-query";
import { getClientAnnouncements } from "@/app/user/announcements/actions";

export const useClientAnnouncements = () => {
  return useQuery({
    queryKey: ["getClientAnnouncements"],
    queryFn: async () => {
      const response = await getClientAnnouncements();
      if (!response.success) return
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5, 
  })
}
'use client'
import { useQuery } from "@tanstack/react-query";
import { getClientAppointments } from "@/app/user/actions";

export const useClientAppointments = () => {
  return useQuery({
    queryKey: ["getClientAppointments"],
    queryFn: async () => {
      const response = await getClientAppointments();
      if (!response.success) return
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5, 
  });
}

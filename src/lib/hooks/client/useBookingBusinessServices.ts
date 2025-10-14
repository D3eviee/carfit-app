'use client'
import { useQuery } from "@tanstack/react-query";
import { getBusinessCategoriesAndServices } from "@/app/(landing)/actions";

export const useBookingBusinessServices = (businessId:string) => {
  return useQuery({
    queryKey: ["businessCategoriesAndServicesData"],
    queryFn: async () => {
      const response = await getBusinessCategoriesAndServices(businessId); 
      if (!response.success) return
      return response.data;
    },
  })
}
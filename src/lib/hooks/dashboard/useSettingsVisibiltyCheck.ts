import { getDataForPublicityCheck } from "@/app/dashboard/settings/actions"
import { useQuery } from "@tanstack/react-query"


export const useSettingsVisibilityCheck = () => {
    return useQuery({
        queryKey: ["settingsCheckIsVisible"],
        queryFn: async () => {
        const response = await getDataForPublicityCheck()
        if(!response) return
        return response.data
    } 
  }) 
} 
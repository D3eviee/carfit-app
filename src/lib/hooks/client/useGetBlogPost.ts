import { useQuery } from "@tanstack/react-query";
import { getBlogPost } from "@/app/blog/actions";

export const useBlogPost = (id:string) => {
  return useQuery({
    queryKey: ["useBlogPost"],
    queryFn: async () => {
      const response = await getBlogPost(id);
      if (!response.success){
        return []
      } 
      return response.data
    },
  });
}
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/app/blog/actions";

export const useGetBlogPosts = () => {
  return useQuery({
    queryKey: ["useBlogPosts"],
    queryFn: async () => {
      const response = await getBlogPosts();
      if (!response.success){
        return []
      } 
      return response.data
    },
  });
}
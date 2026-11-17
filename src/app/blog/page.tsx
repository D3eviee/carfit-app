'use client'
import { ArticleThumbnail } from "@/components/blog/ArticleThumbnail"
import { useGetBlogPosts } from "@/lib/hooks/client/useGetBlogPosts"

export default function BlogsPage() {
  const query = useGetBlogPosts()

  const data = query.data
  if(!data) return 

  return (
   <div className="w-full flex flex-col gap-8 md:gap-16 px-4 xl:px-20 2xl:px-36 2xl:w-4/5 2xl:mx-auto">
    <h1 className="w-full md:mx-auto text-[#1D1D1F] text-5xl font-bold mt-10 md:mt-20">BLOG</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden mx-auto">
      {data.map(article => <ArticleThumbnail article={article} key={article.id}/> )}
    </div>
  </div>
  )
}
